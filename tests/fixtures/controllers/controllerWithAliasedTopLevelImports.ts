import { Controller, Get as TopLevelGet, Route as TopLevelRoute, Tags as TopLevelTags } from 'tsoa-next'
import { ModelService } from '../services/modelService'
import { TestModel as TestModelRenamed } from '../testModel'

@TopLevelRoute('AliasedTopLevelDecorators')
@TopLevelTags('TopLevelAliasTag')
export class AliasedTopLevelDecoratorImportsController extends Controller {
  @TopLevelGet()
  public async getAliased(): Promise<TestModelRenamed> {
    return Promise.resolve(new ModelService().getModel())
  }
}
