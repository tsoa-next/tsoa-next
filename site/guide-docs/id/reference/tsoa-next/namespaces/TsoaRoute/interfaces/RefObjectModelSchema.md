---
lastUpdated: 2026-04-20T21:59:41.364Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [TsoaRoute](../index.md) / RefObjectModelSchema

# Antarmuka: RefObjectModelSkema

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:36](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L36)

Skema runtime bagi model objek direferensikan dengan rute yang dihasilkan.

## Properti

### additionalProperties?

```ts
optional additionalProperties?: boolean | PropertySchema;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:39](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L39)

***

### dataType

```ts
dataType: "refObject";
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L37)

***

### properties

```ts
properties: object;
```

Didefinisikan dalam: [packages/runtime/src/routeGeneration/tsoa-route.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L38)

#### Tanda tangan indeks

```ts
[name: string]: PropertySchema
```
