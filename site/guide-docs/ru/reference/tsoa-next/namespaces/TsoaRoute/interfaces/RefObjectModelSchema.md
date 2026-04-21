---
lastUpdated: 2026-04-20T21:59:41.364Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [TsoaRoute](../index.md) / RefObjectModelSchema

# Интерфейс: RefObjectModelSchema

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:36](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L36)

Схема времени выполнения для моделей объектов, на которые ссылаются генерируемые маршруты.

## Свойства

### additionalProperties?

```ts
optional additionalProperties?: boolean | PropertySchema;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:39](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L39)

***

### dataType

```ts
dataType: "refObject";
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L37)

***

### properties

```ts
properties: object;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L38)

#### Индексная подпись

```ts
[name: string]: PropertySchema
```
