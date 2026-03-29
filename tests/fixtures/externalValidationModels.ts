import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import * as Joi from 'joi'
import { array, integer, object, optional, size, string } from 'superstruct'
import * as yup from 'yup'
import { z } from 'zod'

export type ExternalLiteralUnionAlias = 'active' | 'disabled'
export type ExternalObjectAlias = {
  name: string
  tags: string[]
  status: ExternalLiteralUnionAlias
}
export type ExternalIntersectionAlias = ExternalObjectAlias & {
  auditId: number
}
export type ExternalSearchResultAlias = ExternalObjectAlias | ExternalIntersectionAlias
export type ExternalPage<T> = {
  items: T[]
  total: number
}
export type ExternalObjectPageAlias = ExternalPage<ExternalObjectAlias>

export const ZodBodySchema = z.object({
  name: z.string().min(3, 'validation.external.zod.name.min'),
  status: z.enum(['active', 'disabled']),
  tags: z.array(z.string()).min(1, 'validation.external.zod.tags.min'),
})

export const ZodAuthoritativeSchema = z.string().min(2, 'validation.external.zod.authoritative.min')

export const JoiBodySchema = Joi.object({
  name: Joi.string().min(3).required(),
  status: Joi.string().valid('active', 'disabled').required(),
  tags: Joi.array().items(Joi.string()).min(1).required(),
  auditId: Joi.number().integer().positive().required(),
})

export const YupBodySchema = yup
  .object({
    name: yup.string().required().min(3),
    status: yup.mixed<ExternalLiteralUnionAlias>().oneOf(['active', 'disabled']).required(),
    tags: yup.array(yup.string().required()).min(1).required(),
  })
  .required()

export const SuperstructBodySchema = object({
  name: size(string(), 3, 50),
  status: string(),
  tags: size(array(string()), 1, 10),
  auditId: optional(integer()),
})

interface PositiveFloatBrand {
  readonly PositiveFloat: unique symbol
}

export const PositiveFloat = withMessage(
  t.brand(
    t.number,
    (n): n is t.Branded<number, PositiveFloatBrand> => Number.isFinite(n) && n > 0,
    'PositiveFloat',
  ),
  () => 'validation.wager.amount.mustBePositiveFloat',
)

interface PositiveIntegerBrand {
  readonly PositiveInteger: unique symbol
}

export const PositiveInteger = withMessage(
  t.brand(
    t.Int,
    (n): n is t.Branded<t.Int, PositiveIntegerBrand> => n > 0,
    'PositiveInteger',
  ),
  () => 'validation.wager.outcome.mustBePositiveInteger',
)

export const WagerCodec = t.type({
  amount: PositiveFloat,
  outcome: PositiveInteger,
})

export type Wager = t.TypeOf<typeof WagerCodec>
