export type Newable<
  T = unknown,
   
  TArgs extends unknown[] = any[],
> = new (...args: TArgs) => T

export type ServiceIdentifier<T = unknown> =
  | string
  | symbol
  | Newable<T>
   
  | Function

export interface IocContainer {
  get<T>(controller: ServiceIdentifier<T>): T
  get<T>(controller: ServiceIdentifier<T>): Promise<T>
}

 
export type IocContainerFactory<T = any> = (request: T) => IocContainer
