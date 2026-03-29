import 'reflect-metadata'
import { expect } from 'chai'
import 'mocha'
import { TsoaRoute, ValidationService } from '@tsoa-next/runtime'
import * as runtimeSource from '../../../packages/runtime/src'
import { Validate as sourceValidate, getParameterExternalValidatorMetadata } from '../../../packages/runtime/src/decorators/validate'
import { validateExternalSchema as sourceValidateExternalSchema } from '../../../packages/runtime/src/routeGeneration/externalValidation'
import { z } from 'zod'
import { JoiBodySchema, SuperstructBodySchema, WagerCodec, YupBodySchema, ZodAuthoritativeSchema, ZodBodySchema } from '../../fixtures/externalValidationModels'

describe('External validation runtime', () => {
  const validationConfig = {
    noImplicitAdditionalProperties: 'ignore' as const,
    bodyCoercion: true,
  }

  it('re-exports validation helpers from the source runtime barrel', () => {
    expect(runtimeSource.Validate).to.be.a('function')
    expect(runtimeSource.validateExternalSchema).to.be.a('function')
    expect(runtimeSource.ValidationService).to.be.a('function')
  })

  it('stores validator metadata for each supported decorator form', () => {
    const target = {}
    const zodStringSchema = z.string()

    sourceValidate(ZodBodySchema)(target, 'zodInferred', 0)
    sourceValidate('joi', JoiBodySchema)(target, 'joiExplicit', 1)
    sourceValidate({ kind: 'yup', schema: YupBodySchema })(target, 'yupObject', 2)
    sourceValidate(SuperstructBodySchema)(target, 'superstructInferred', 3)
    sourceValidate(WagerCodec)(target, 'ioTsInferred', 4)
    sourceValidate(zodStringSchema)(target, undefined, 5)

    expect(getParameterExternalValidatorMetadata(target, 'zodInferred', 0)).to.deep.equal({ kind: 'zod', schema: ZodBodySchema })
    expect(getParameterExternalValidatorMetadata(target, 'joiExplicit', 1)).to.deep.equal({ kind: 'joi', schema: JoiBodySchema })
    expect(getParameterExternalValidatorMetadata(target, 'yupObject', 2)).to.deep.equal({ kind: 'yup', schema: YupBodySchema })
    expect(getParameterExternalValidatorMetadata(target, 'superstructInferred', 3)).to.deep.equal({ kind: 'superstruct', schema: SuperstructBodySchema })
    expect(getParameterExternalValidatorMetadata(target, 'ioTsInferred', 4)).to.deep.equal({ kind: 'io-ts', schema: WagerCodec })
    expect(getParameterExternalValidatorMetadata(target, undefined, 5)).to.deep.equal({ kind: 'zod', schema: zodStringSchema })
  })

  it('reads validator metadata through the prototype chain', () => {
    const parent = {}
    const child = Object.create(parent)

    sourceValidate(ZodBodySchema)(parent, 'submit', 0)

    expect(getParameterExternalValidatorMetadata(child, 'submit', 0)).to.deep.equal({
      kind: 'zod',
      schema: ZodBodySchema,
    })
  })

  it('rejects invalid decorator argument combinations', () => {
    expect(() => sourceValidate()).to.throw('@Validate requires a schema argument.')
    expect(() => sourceValidate('zod')).to.throw("@Validate('zod', schema) requires a schema value.")
    expect(() => sourceValidate('ajv' as never, {})).to.throw("@Validate received unsupported validator kind 'ajv'.")
    expect(() => sourceValidate({ kind: 'ajv', schema: {} } as never)).to.throw("@Validate received unsupported validator kind 'ajv'.")
    expect(() => sourceValidate({ kind: 'zod' } as never)).to.throw('@Validate(schema) could not infer the validator kind. Use @Validate(kind, schema) instead.')
    expect(() => sourceValidate({ kind: 'zod', schema: undefined } as never)).to.throw('@Validate requires a schema value.')
    expect(() => sourceValidate({}, {}, {})).to.throw('@Validate accepts only (schema), (kind, schema), or ({ kind, schema }).')
    expect(() => sourceValidate({})).to.throw('@Validate(schema) could not infer the validator kind. Use @Validate(kind, schema) instead.')
  })

  it('returns successful results for every supported runtime adapter', () => {
    const zodResult = sourceValidateExternalSchema('zod', ZodBodySchema, {
      name: 'valid',
      status: 'active',
      tags: ['ok'],
    })
    const joiResult = sourceValidateExternalSchema('joi', JoiBodySchema, {
      name: 'valid',
      status: 'active',
      tags: ['ok'],
      auditId: 1,
    })
    const yupResult = sourceValidateExternalSchema('yup', YupBodySchema, {
      name: 'valid',
      status: 'active',
      tags: ['ok'],
    })
    const superstructResult = sourceValidateExternalSchema('superstruct', SuperstructBodySchema, {
      name: 'valid',
      status: 'active',
      tags: ['ok'],
      auditId: 1,
    })
    const ioTsResult = sourceValidateExternalSchema('io-ts', WagerCodec, {
      amount: 1,
      outcome: 1,
    })

    expect(zodResult).to.deep.include({ ok: true })
    expect(joiResult).to.deep.include({ ok: true })
    expect(yupResult).to.deep.include({ ok: true })
    expect(superstructResult).to.deep.include({ ok: true })
    expect(ioTsResult).to.deep.include({ ok: true })
  })

  it('throws clear adapter contract errors for invalid schema objects', () => {
    expect(() => sourceValidateExternalSchema('zod', {}, 'value')).to.throw('Expected a Zod schema with safeParse().')
    expect(() => sourceValidateExternalSchema('joi', {}, 'value')).to.throw('Expected a Joi schema with validate().')
    expect(() => sourceValidateExternalSchema('yup', {}, 'value')).to.throw('Expected a Yup schema with validateSync().')
    expect(() => sourceValidateExternalSchema('io-ts', {}, 'value')).to.throw('Expected an io-ts codec with decode().')
  })

  it('applies custom error formatters to external validation failures', () => {
    const result = sourceValidateExternalSchema(
      'zod',
      ZodBodySchema,
      {
        name: 'x',
        status: 'active',
        tags: [],
      },
      {
        errorFormatter: failure => ({
          ...failure,
          summaryMessage: 'formatted',
          issues: failure.issues.map(issue => ({
            ...issue,
            message: `formatted:${issue.message}`,
          })),
        }),
      },
    )

    if (result.ok) {
      throw new Error('Expected zod validation to fail.')
    }

    expect(result.failure.summaryMessage).to.equal('formatted')
    expect(result.failure.issues.every(issue => issue.message?.startsWith('formatted:'))).to.equal(true)
  })

  it('falls back to a generic io-ts summary when PathReporter is unavailable', () => {
    const moduleLoader = require('node:module') as {
      prototype: { require: (id: string) => unknown }
    }
    const originalRequire = moduleLoader.prototype.require
    const pathReporterModulePath = require.resolve('io-ts/PathReporter')

    moduleLoader.prototype.require = function patchedRequire(id: string) {
      if (id === pathReporterModulePath) {
        throw new Error('module not found')
      }

      return originalRequire.apply(this, [id])
    }

    try {
      const result = sourceValidateExternalSchema(
        'io-ts',
        {
          decode: () => ({
            _tag: 'Left',
            left: [{ context: [{ key: '', type: { name: 'Root' } }] }],
          }),
        },
        {},
      )

      if (result.ok) {
        throw new Error('Expected io-ts validation to fail.')
      }

      expect(result.failure.summaryMessage).to.equal('io-ts validation failed.')
    } finally {
      moduleLoader.prototype.require = originalRequire
    }
  })

  it('rethrows transitive module loading failures instead of masking them as missing validators', () => {
    const moduleLoader = require('node:module') as {
      prototype: { require: (id: string) => unknown }
    }
    const originalRequire = moduleLoader.prototype.require
    const runtimeModulePath = require.resolve('../../../packages/runtime/src/routeGeneration/externalValidation')
    const superstructModulePath = require.resolve('superstruct')

    delete require.cache[runtimeModulePath]
    moduleLoader.prototype.require = function patchedRequire(id: string) {
      if (id === superstructModulePath) {
        const error = new Error("Cannot find module 'transitive-dependency'") as Error & { code?: string }
        error.code = 'MODULE_NOT_FOUND'
        throw error
      }

      return originalRequire.apply(this, [id])
    }

    try {
      const { validateExternalSchema } =
        require('../../../packages/runtime/src/routeGeneration/externalValidation') as typeof import('../../../packages/runtime/src/routeGeneration/externalValidation')

      let thrownError: Error | undefined

      try {
        validateExternalSchema('superstruct', {}, {})
      } catch (error) {
        thrownError = error as Error
      }

      expect(thrownError).to.be.instanceOf(Error)
      expect(thrownError?.message).to.equal("Cannot find module 'transitive-dependency'")
      expect(thrownError?.message).not.to.contain("External validator 'superstruct' is not installed")
    } finally {
      moduleLoader.prototype.require = originalRequire
      delete require.cache[runtimeModulePath]
    }
  })

  it('normalizes zod failures', () => {
    const result = sourceValidateExternalSchema('zod', ZodBodySchema, {
      name: 'xy',
      status: 'active',
      tags: [],
    })

    if (result.ok) {
      throw new Error('Expected zod validation to fail.')
    }

    expect(result.failure.source).to.equal('zod')
    expect(result.failure.issues.map(issue => issue.path)).to.include.members(['name', 'tags'])
    expect(result.failure.issues.some(issue => issue.code.length > 0)).to.equal(true)
  })

  it('normalizes joi failures', () => {
    const result = sourceValidateExternalSchema('joi', JoiBodySchema, {
      name: 'valid',
      status: 'active',
      tags: ['ok'],
      auditId: -1,
    })

    if (result.ok) {
      throw new Error('Expected joi validation to fail.')
    }

    expect(result.failure.source).to.equal('joi')
    expect(result.failure.issues.map(issue => issue.path)).to.include('auditId')
    expect(result.failure.issues[0].code).to.be.a('string')
  })

  it('normalizes yup failures', () => {
    const result = sourceValidateExternalSchema('yup', YupBodySchema, {
      name: 'xy',
      status: 'invalid',
      tags: [],
    })

    if (result.ok) {
      throw new Error('Expected yup validation to fail.')
    }

    expect(result.failure.source).to.equal('yup')
    expect(result.failure.issues.map(issue => issue.path)).to.include.members(['name', 'status', 'tags'])
  })

  it('normalizes superstruct failures', () => {
    const result = sourceValidateExternalSchema('superstruct', SuperstructBodySchema, {
      name: 12,
      status: 'active',
      tags: [],
      auditId: 1,
    })

    if (result.ok) {
      throw new Error('Expected superstruct validation to fail.')
    }

    expect(result.failure.source).to.equal('superstruct')
    expect(result.failure.issues.map(issue => issue.path)).to.include.members(['name', 'tags'])
  })

  it('normalizes io-ts branded failures and preserves message keys', () => {
    const result = sourceValidateExternalSchema(
      'io-ts',
      WagerCodec,
      {
        amount: -1,
        outcome: 0,
      },
      {
        translate: key => `translated:${key}`,
      },
    )

    if (result.ok) {
      throw new Error('Expected io-ts validation to fail.')
    }

    expect(result.failure.source).to.equal('io-ts')
    expect(result.failure.issues.map(issue => issue.path)).to.include.members(['amount', 'outcome'])
    expect(result.failure.issues.find(issue => issue.path === 'amount')?.messageKey).to.equal('validation.wager.amount.mustBePositiveFloat')
    expect(result.failure.issues.find(issue => issue.path === 'amount')?.message).to.equal('translated:validation.wager.amount.mustBePositiveFloat')
    expect(result.failure.issues.find(issue => issue.path === 'outcome')?.messageKey).to.equal('validation.wager.outcome.mustBePositiveInteger')
  })

  it('skips built-in validation when external validation owns the node', () => {
    class ExternalController {
      public submit(@sourceValidate(ZodAuthoritativeSchema) payload: string) {
        return payload
      }
    }

    const service = new ValidationService({}, validationConfig)
    const fieldErrors = {}
    const schema: TsoaRoute.PropertySchema = {
      dataType: 'double',
      required: true,
      validationStrategy: 'external',
      externalValidator: {
        kind: 'zod',
        strategy: 'external',
      },
    }

    const result = service.ValidateParam(schema, '42', 'payload', fieldErrors, true, '', {
      controllerClass: ExternalController,
      methodName: 'submit',
      parameterIndex: 0,
    })

    expect(result).to.equal('42')
    expect(fieldErrors).to.deep.equal({})
  })

  it('treats external validation as authoritative even when built-in validation would pass', () => {
    class ExternalController {
      public submit(@sourceValidate(ZodAuthoritativeSchema) payload: string) {
        return payload
      }
    }

    const service = new ValidationService({}, validationConfig)
    const fieldErrors = {}
    const schema: TsoaRoute.PropertySchema = {
      dataType: 'double',
      required: true,
      validationStrategy: 'external',
      externalValidator: {
        kind: 'zod',
        strategy: 'external',
      },
    }

    const result = service.ValidateParam(schema, 42, 'payload', fieldErrors, true, '', {
      controllerClass: ExternalController,
      methodName: 'submit',
      parameterIndex: 0,
    })

    expect(result).to.equal(undefined)
    expect(fieldErrors).to.have.property('payload')
  })

  it('enforces required route metadata before delegating to external validation', () => {
    class ExternalController {
      public submit(@sourceValidate(z.string().optional()) payload?: string) {
        return payload
      }
    }

    const service = new ValidationService({}, validationConfig)
    const fieldErrors: Record<string, { message: string; value: unknown }> = {}
    const schema: TsoaRoute.PropertySchema = {
      dataType: 'string',
      required: true,
      validationStrategy: 'external',
      externalValidator: {
        kind: 'zod',
        strategy: 'external',
      },
    }

    const result = service.ValidateParam(schema, undefined, 'payload', fieldErrors, true, '', {
      controllerClass: ExternalController,
      methodName: 'submit',
      parameterIndex: 0,
    })

    expect(result).to.equal(undefined)
    expect(fieldErrors).to.deep.equal({
      payload: {
        message: "'payload' is required",
        value: undefined,
      },
    })
  })

  it('applies translation hooks when projecting external issues to legacy field errors', () => {
    class ExternalController {
      public submit(@sourceValidate(ZodAuthoritativeSchema) payload: string) {
        return payload
      }
    }

    const service = new ValidationService(
      {},
      {
        ...validationConfig,
        validation: {
          translate: key => `translated:${key}`,
        },
      },
    )
    const fieldErrors: Record<string, { message: string; value: unknown }> = {}
    const schema: TsoaRoute.PropertySchema = {
      dataType: 'string',
      required: true,
      validationStrategy: 'external',
      externalValidator: {
        kind: 'zod',
        strategy: 'external',
      },
    }

    service.ValidateParam(schema, 'x', 'payload', fieldErrors, true, '', {
      controllerClass: ExternalController,
      methodName: 'submit',
      parameterIndex: 0,
    })

    expect(fieldErrors.payload.message).to.equal('translated:validation.external.zod.authoritative.min')
  })

  it('fails clearly when generated route metadata and runtime validator metadata disagree on validator kind', () => {
    class ExternalController {
      public submit(@sourceValidate('zod', ZodAuthoritativeSchema) payload: string) {
        return payload
      }
    }

    const service = new ValidationService({}, validationConfig)
    const fieldErrors: Record<string, { message: string; value: unknown }> = {}
    const schema: TsoaRoute.PropertySchema = {
      dataType: 'string',
      required: true,
      validationStrategy: 'external',
      externalValidator: {
        kind: 'yup',
        strategy: 'external',
      },
    }

    service.ValidateParam(schema, 'ok', 'payload', fieldErrors, true, '', {
      controllerClass: ExternalController,
      methodName: 'submit',
      parameterIndex: 0,
    })

    expect(fieldErrors.payload.message).to.contain("Route schema expects 'yup' but runtime metadata provided 'zod'")
  })

  it('finds runtime external validator metadata for static controller methods', () => {
    class StaticExternalController {
      public static submit(@sourceValidate(ZodAuthoritativeSchema) payload: string) {
        return payload
      }
    }

    const service = new ValidationService({}, validationConfig)
    const fieldErrors = {}
    const schema: TsoaRoute.PropertySchema = {
      dataType: 'double',
      required: true,
      validationStrategy: 'external',
      externalValidator: {
        kind: 'zod',
        strategy: 'external',
      },
    }

    const result = service.ValidateParam(schema, '42', 'payload', fieldErrors, true, '', {
      controllerClass: StaticExternalController,
      methodName: 'submit',
      parameterIndex: 0,
    })

    expect(result).to.equal('42')
    expect(fieldErrors).to.deep.equal({})
  })

  it('includes actionable context when runtime external validator metadata is missing', () => {
    const service = new ValidationService({}, validationConfig)
    const fieldErrors: Record<string, { message: string; value: unknown }> = {}
    const schema: TsoaRoute.PropertySchema = {
      dataType: 'string',
      required: true,
      validationStrategy: 'external',
      externalValidator: {
        kind: 'zod',
        strategy: 'external',
      },
    }

    service.ValidateParam(schema, 'payload', 'payload', fieldErrors, true, 'body.')

    expect(fieldErrors['body.payload'].message).to.contain("Missing runtime schema metadata for external validator 'zod' on 'body.payload'")
    expect(fieldErrors['body.payload'].message).to.contain('Ensure the controller module is imported so decorators run')
  })
})
