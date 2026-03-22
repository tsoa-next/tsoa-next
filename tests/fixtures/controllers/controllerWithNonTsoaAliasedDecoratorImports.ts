import { Controller, Route } from '@tsoa-next/runtime'
import { Get as RequestGet, Query as RequestQuery } from './nonTsoaDecorators'

@Route('NonTsoaAliasedDecorators')
export class NonTsoaAliasedDecoratorImportsController extends Controller {
  @RequestGet('{id}')
  public async getIgnored(@RequestQuery() id: string): Promise<string> {
    return Promise.resolve(id)
  }
}
