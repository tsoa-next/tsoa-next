---
lastUpdated: 2026-04-20T21:59:41.358Z
---
[tsoa-next](../../../../packages.md) / [tsoa-next](../../../index.md) / [Tsoa](../index.md) / Parameter

# इंटरफ़ेस: पैरामीटर

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:74](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L74)

## द्वारा विस्तारित

- [`ResParameter`](ResParameter.md)
- [`ArrayParameter`](ArrayParameter.md)

## गुण

### $ref?

```ts
optional $ref?: BaseSchema<unknown>;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L90)

***

### default?

```ts
optional default?: unknown;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L83)

***

### deprecated

```ts
deprecated: boolean;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:87](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L87)

***

### description?

```ts
optional description?: string;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:78](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L78)

***

### example?

```ts
optional example?: Example[];
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:77](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L77)

***

### exampleLabels?

```ts
optional exampleLabels?: (string | undefined)[];
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L88)

***

### externalValidator?

```ts
optional externalValidator?: ExternalValidatorDescriptor;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:86](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L86)

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

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L79)

***

### name

```ts
name: string;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:80](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L80)

***

### parameterIndex?

```ts
optional parameterIndex?: number;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:75](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L75)

***

### parameterName

```ts
parameterName: string;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:76](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L76)

***

### required?

```ts
optional required?: boolean;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L81)

***

### title?

```ts
optional title?: string;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:89](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L89)

***

### type

```ts
type: Type;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:82](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L82)

***

### validationStrategy?

```ts
optional validationStrategy?: ValidationStrategy;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:85](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L85)

***

### validators

```ts
validators: Validators;
```

में परिभाषित: [packages/runtime/src/metadataGeneration/tsoa.ts:84](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/metadataGeneration/tsoa.ts#L84)
