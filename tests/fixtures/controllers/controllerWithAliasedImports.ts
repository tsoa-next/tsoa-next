import {
  Body as RequestBody,
  Controller,
  Get as RequestGet,
  Path as RequestPath,
  Post as RequestPost,
  RequestProp as RequestRequestProp,
  Response as RequestResponse,
  Route as RequestRoute,
  Security as RequestSecurity,
  Tags as RequestTags,
} from '@tsoa-next/runtime'
import { ModelService } from '../services/modelService'
import { TestModel as TestModelAlternative, TestModel as TestModelRenamed, TestSubModel as TestSubModelRenamed } from '../testModel'

@RequestRoute('AliasedDecorators')
@RequestTags('ControllerAliasTag')
@RequestSecurity('api_key')
export class AliasedDecoratorImportsController extends Controller {
  @RequestGet('{id}')
  @RequestTags('MethodAliasTag')
  @RequestResponse<TestModelRenamed>('202', 'Accepted')
  public async getAliased(@RequestPath() id: string): Promise<TestModelRenamed> {
    const model = new ModelService().getModel()
    model.id = Number(id)
    return Promise.resolve(model)
  }

  @RequestGet('requestProp')
  public async getAliasedRequestProp(@RequestRequestProp('query') query: { id?: string }): Promise<string> {
    return Promise.resolve(String(query.id ?? ''))
  }

  @RequestPost('body')
  public async postAliased(@RequestBody() body: TestModelAlternative): Promise<TestSubModelRenamed> {
    return Promise.resolve(body.modelValue)
  }
}

@RequestRoute('AliasedDecoratorsSecond')
export class AliasedDecoratorImportsSecondController extends Controller {
  @RequestGet()
  public async getAgain(): Promise<TestModelAlternative> {
    return Promise.resolve(new ModelService().getModel())
  }
}
