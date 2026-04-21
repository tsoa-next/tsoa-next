---
lastUpdated: 2026-04-20T21:59:41.358Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Tsoa](../index.md) / Parameter

# ইন্টারফেস: পরামিতি

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:74](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L74)

## এক্সটেন্ডেড

- [`ResParameter`](ResParameter.md)
- [`ArrayParameter`](ArrayParameter.md)

## বৈশিষ্ট্য

### $ref?

```ts
optional $ref?: BaseSchema<unknown>;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L90)

***

### default?

```ts
optional default?: unknown;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L83)

***

### deprecated

```ts
deprecated: boolean;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:87](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L87)

***

### description?

```ts
optional description?: string;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:78](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L78)

***

### example?

```ts
optional example?: Example[];
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L77)

***

### exampleLabels?

```ts
optional exampleLabels?: (string | undefined)[];
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L88)

***

### externalValidator?

```ts
optional externalValidator?: ExternalValidatorDescriptor;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:86](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L86)

***

### in

```ts
in: 
  | "request"
  | "body"
  | "path"
  | "query"
  | "header"
  | "res"
  | "formData"
  | "queries"
  | "body-prop"
  | "request-prop";
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L79)

***

### name

```ts
name: string;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:80](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L80)

***

### parameterIndex?

```ts
optional parameterIndex?: number;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:75](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L75)

***

### parameterName

```ts
parameterName: string;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:76](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L76)

***

### required?

```ts
optional required?: boolean;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L81)

***

### title?

```ts
optional title?: string;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:89](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L89)

***

### type

```ts
type: Type;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:82](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L82)

***

### validationStrategy?

```ts
optional validationStrategy?: ValidationStrategy;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:85](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L85)

***

### validators

```ts
validators: Validators;
```

নির্ধারিত মান: [packages/runtime/src/metadataGeneration/tsoa.ts:84](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L84)
