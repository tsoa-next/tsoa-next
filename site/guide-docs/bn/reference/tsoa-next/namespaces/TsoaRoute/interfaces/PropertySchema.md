---
lastUpdated: 2026-04-20T21:59:41.363Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [TsoaRoute](../index.md) / PropertySchema

# ইন্টারফেস: বৈশিষ্ট্যSca

নির্ধারিত মান: [packages/runtime/src/routeGeneration/tsoa-route.ts:55](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L55)

স্কীমার দ্বারা পৃথকীকৃত

## এক্সটেন্ডেড

- [`ParameterSchema`](ParameterSchema.md)

## বৈশিষ্ট্য

### additionalProperties?

```ts
optional additionalProperties?: boolean | PropertySchema;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/tsoa-route.ts:67](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L67)

***

### array?

```ts
optional array?: PropertySchema;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/tsoa-route.ts:61](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L61)

***

### dataType?

```ts
optional dataType?: TypeStringLiteral;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/tsoa-route.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L56)

***

### default?

```ts
optional default?: unknown;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/tsoa-route.ts:66](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L66)

***

### enums?

```ts
optional enums?: (string | number | boolean | null)[];
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/tsoa-route.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L62)

***

### externalValidator?

```ts
optional externalValidator?: ExternalValidatorDescriptor;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/tsoa-route.ts:60](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L60)

***

### nestedProperties?

```ts
optional nestedProperties?: object;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/tsoa-route.ts:68](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L68)

#### ইন্ডেক্স স্বাক্ষর

```ts
[name: string]: PropertySchema
```

***

### ref?

```ts
optional ref?: string;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/tsoa-route.ts:57](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L57)

***

### required?

```ts
optional required?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/tsoa-route.ts:58](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L58)

***

### subSchemas?

```ts
optional subSchemas?: PropertySchema[];
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/tsoa-route.ts:64](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L64)

***

### type?

```ts
optional type?: PropertySchema;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/tsoa-route.ts:63](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L63)

***

### validationStrategy?

```ts
optional validationStrategy?: ValidationStrategy;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/tsoa-route.ts:59](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L59)

***

### validators?

```ts
optional validators?: Partial<Record<ValidatorKey, {
  errorMsg?: string;
  value?: unknown;
}>>;
```

নির্ধারিত মান: [packages/runtime/src/routeGeneration/tsoa-route.ts:65](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L65)
