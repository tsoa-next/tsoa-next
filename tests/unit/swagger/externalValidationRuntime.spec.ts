import { expect } from 'chai'
import 'mocha'
import { TsoaRoute, Validate, ValidationService, validateExternalSchema } from '@tsoa-next/runtime'
import { z } from 'zod'
import {
  JoiBodySchema,
  SuperstructBodySchema,
  WagerCodec,
  YupBodySchema,
  ZodAuthoritativeSchema,
  ZodBodySchema,
} from '../../fixtures/externalValidationModels'

describe('External validation runtime', () => {
  const validationConfig = {
    noImplicitAdditionalProperties: 'ignore' as const,
    bodyCoercion: true,
  }

  it('normalizes zod failures', () => {
    const result = validateExternalSchema('zod', ZodBodySchema, {
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
    const result = validateExternalSchema('joi', JoiBodySchema, {
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
    const result = validateExternalSchema('yup', YupBodySchema, {
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
    const result = validateExternalSchema('superstruct', SuperstructBodySchema, {
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
    const result = validateExternalSchema(
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
      public submit(@Validate(ZodAuthoritativeSchema) payload: string) {
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
      public submit(@Validate(ZodAuthoritativeSchema) payload: string) {
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
      public submit(@Validate(z.string().optional()) payload?: string) {
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
      public submit(@Validate(ZodAuthoritativeSchema) payload: string) {
        return payload
      }
    }

    const service = new ValidationService({}, {
      ...validationConfig,
      validation: {
        translate: key => `translated:${key}`,
      },
    })
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
      public submit(@Validate('zod', ZodAuthoritativeSchema) payload: string) {
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
      public static submit(@Validate(ZodAuthoritativeSchema) payload: string) {
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
})
