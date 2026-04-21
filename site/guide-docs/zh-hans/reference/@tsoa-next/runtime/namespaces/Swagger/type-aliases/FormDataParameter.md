---
lastUpdated: 2026-04-20T21:59:41.318Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / FormDataParameter

# 别名类型: FormDataParemeter

```ts
type FormDataParameter = ParameterCommonFields & Swagger2ParameterValue & object;
```

定义如下: [packages/runtime/src/swagger/swagger.ts:152](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L152)

## 声明类型

### collectionFormat?

```ts
optional collectionFormat?: "csv" | "ssv" | "tsv" | "pipes" | "multi";
```

### in

```ts
in: "formData";
```
