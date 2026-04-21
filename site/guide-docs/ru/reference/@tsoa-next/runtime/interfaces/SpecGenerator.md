---
lastUpdated: 2026-04-20T21:59:41.313Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/runtime](../index.md) / SpecGenerator

# Интерфейс: SpecGenerator

Определено в: [packages/runtime/src/decorators/specPath.ts:24](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L24)

Описывает контракт, необходимый для восстановления OpenAPI Документ по требованию.

## Методы

### getSpecObject()

```ts
getSpecObject(): Promise<Spec>;
```

Определено в: [packages/runtime/src/decorators/specPath.ts:25](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L25)

#### Возвращение

`Promise`\<[`Spec`](../namespaces/Swagger/interfaces/Spec.md)\>

***

### getSpecString()

```ts
getSpecString(format): Promise<string>;
```

Определено в: [packages/runtime/src/decorators/specPath.ts:26](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/specPath.ts#L26)

#### Параметры

##### format

[`SpecDocumentFormat`](../type-aliases/SpecDocumentFormat.md)

#### Возвращение

`Promise`\<`string`\>
