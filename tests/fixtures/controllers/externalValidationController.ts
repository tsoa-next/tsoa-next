import { Body, Controller, Get, Path, Post, Query, Route, Validate } from '@tsoa-next/runtime'
import {
  ExternalIntersectionAlias as RenamedExternalIntersectionAlias,
  type ExternalLiteralUnionAlias,
  type ExternalObjectAlias,
  type ExternalObjectPageAlias,
  type ExternalPrimitiveAlias,
  type ExternalSearchResultAlias,
  JoiBodySchema,
  SuperstructBodySchema,
  Wager,
  WagerCodec,
  YupBodySchema,
  ZodAuthoritativeSchema,
  ZodBodySchema,
} from '../externalValidationModels'

@Route('ExternalValidation')
export class ExternalValidationController extends Controller {
  @Post('zod')
  public zod(@Body() @Validate(ZodBodySchema) payload: ExternalObjectAlias): ExternalObjectAlias {
    return payload
  }

  @Post('zod-authoritative')
  public zodAuthoritative(@Body() @Validate(ZodAuthoritativeSchema) payload: number): unknown {
    return payload
  }

  @Post('joi')
  public joi(@Body() @Validate('joi', JoiBodySchema) payload: RenamedExternalIntersectionAlias): RenamedExternalIntersectionAlias {
    return payload
  }

  @Post('yup')
  public yup(@Body() @Validate({ kind: 'yup', schema: YupBodySchema }) payload: ExternalObjectAlias): ExternalObjectAlias {
    return payload
  }

  @Post('superstruct')
  public superstruct(@Body() @Validate('superstruct', SuperstructBodySchema) payload: RenamedExternalIntersectionAlias): RenamedExternalIntersectionAlias {
    return payload
  }

  @Post('io-ts')
  public ioTs(@Body() @Validate({ kind: 'io-ts', schema: WagerCodec }) wager: Wager): Wager {
    return wager
  }

  @Post('alias')
  public aliasBody(@Body() payload: RenamedExternalIntersectionAlias): RenamedExternalIntersectionAlias {
    return payload
  }

  @Get('alias/{id}')
  public aliasPath(@Path() id: ExternalPrimitiveAlias, @Query() status?: ExternalLiteralUnionAlias): RenamedExternalIntersectionAlias {
    return {
      auditId: 7,
      name: id,
      status: status || 'active',
      tags: ['baseline'],
    }
  }

  @Get('search')
  public search(): ExternalSearchResultAlias {
    return {
      name: 'search-result',
      status: 'active',
      tags: ['one'],
    }
  }

  @Get('page')
  public page(): ExternalObjectPageAlias {
    return {
      items: [
        {
          name: 'page-item',
          status: 'disabled',
          tags: ['a'],
        },
      ],
      total: 1,
    }
  }
}
