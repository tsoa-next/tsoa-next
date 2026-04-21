---
lastUpdated: 2026-04-20T21:59:41.353Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Swagger](../index.md) / FormDataParameter

# Type Alias: Paramètre FormData

```ts
type FormDataParameter = ParameterCommonFields & Swagger2ParameterValue & object;
```

Définie dans : [packages/runtime/src/swagger/swagger.ts:152](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L152)

## Déclaration de type

### collectionFormat?

```ts
optional collectionFormat?: "csv" | "ssv" | "tsv" | "pipes" | "multi";
```

### in

```ts
in: "formData";
```
