/** Constructor type used for IoC container lookups. */
export type Newable<T = unknown, TArgs extends unknown[] = unknown[]> = new (...args: TArgs) => T

/** Identifier types accepted by tsoa IoC container integrations. */
export type ServiceIdentifier<T = unknown> = string | symbol | Newable<T> | Function

/** Minimal runtime container contract used to resolve controller instances. */
export interface IocContainer {
  get<T>(controller: ServiceIdentifier<T>): T
  get<T>(controller: ServiceIdentifier<T>): Promise<T>
}

/** Factory signature used to build an {@link IocContainer} per incoming request. */
export type IocContainerFactory<T = unknown> = {
  bivarianceHack(request: T): IocContainer
}['bivarianceHack']
