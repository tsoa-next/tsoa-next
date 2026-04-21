---
lastUpdated: 2026-04-20T21:59:41.326Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [TsoaRoute](../index.md) / RefObjectModelSchema

# Interfaz: RefObjectModelSchema

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:36](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L36)

Esquema de tiempo de ejecución para los modelos de objetos referenciados por rutas generadas.

## Propiedades

### additionalProperties?

```ts
optional additionalProperties?: boolean | PropertySchema;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:39](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L39)

***

### dataType

```ts
dataType: "refObject";
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:37](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L37)

***

### properties

```ts
properties: object;
```

Definido en: [packages/runtime/src/routeGeneration/tsoa-route.ts:38](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L38)

#### Index Signature

```ts
[name: string]: PropertySchema
```
