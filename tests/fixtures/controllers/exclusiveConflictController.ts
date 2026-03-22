import { Get, Query, Route } from '@tsoa-next/runtime'

@Route('ExclusiveConflict')
export class ExclusiveConflictController {
  /**
   * @param {number} value
   * @isInt value
   * @minimum value 5
   * @exclusiveMinimum value 5
   * @maximum value 10
   * @exclusiveMaximum value 10
   */
  @Get('value')
  public value(@Query() value: number): Promise<number> {
    return Promise.resolve(value)
  }
}
