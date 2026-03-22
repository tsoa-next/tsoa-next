import { Get, Query, Route } from '@tsoa-next/runtime'

@Route('ExclusiveParameter')
export class ExclusiveParameterController {
  /**
   * @param {number} value
   * @isInt value
   * @exclusiveMinimum value 5
   */
  @Get('lower')
  public lower(@Query() value: number): Promise<number> {
    return Promise.resolve(value)
  }

  /**
   * @param {number} value
   * @isInt value
   * @exclusiveMaximum value 10
   */
  @Get('upper')
  public upper(@Query() value: number): Promise<number> {
    return Promise.resolve(value)
  }

  /**
   * @param {number} value
   * @isInt value
   * @exclusiveMinimum value 5
   * @exclusiveMaximum value 10
   */
  @Get('range')
  public range(@Query() value: number): Promise<number> {
    return Promise.resolve(value)
  }
}
