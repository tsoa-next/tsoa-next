---
lastUpdated: 2026-04-20T21:59:41.326Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [TsoaRoute](../index.md) / ParameterSchema

# Интерфейс: ParameterSchema

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:72](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L72)

Схема времени выполнения для параметра маршрута.

## расширять

- [`PropertySchema`](PropertySchema.md)

## Свойства

### additionalProperties?

```ts
optional additionalProperties?: boolean | PropertySchema;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:67](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L67)

#### Унаследованный от

[`PropertySchema`](PropertySchema.md).[`additionalProperties`](PropertySchema.md#additionalproperties)

***

### array?

```ts
optional array?: PropertySchema;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:61](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L61)

#### Унаследованный от

[`PropertySchema`](PropertySchema.md).[`array`](PropertySchema.md#array)

***

### dataType?

```ts
optional dataType?: TypeStringLiteral;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:56](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L56)

#### Унаследованный от

[`PropertySchema`](PropertySchema.md).[`dataType`](PropertySchema.md#datatype)

***

### default?

```ts
optional default?: unknown;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:66](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L66)

#### Унаследованный от

[`PropertySchema`](PropertySchema.md).[`default`](PropertySchema.md#default)

***

### enums?

```ts
optional enums?: (string | number | boolean | null)[];
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:62](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L62)

#### Унаследованный от

[`PropertySchema`](PropertySchema.md).[`enums`](PropertySchema.md#enums)

***

### externalValidator?

```ts
optional externalValidator?: ExternalValidatorDescriptor;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:60](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L60)

#### Унаследованный от

[`PropertySchema`](PropertySchema.md).[`externalValidator`](PropertySchema.md#externalvalidator)

***

### in

```ts
in: string;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:75](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L75)

***

### name

```ts
name: string;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:74](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L74)

***

### nestedProperties?

```ts
optional nestedProperties?: object;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:68](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L68)

#### Индексная подпись

```ts
[name: string]: PropertySchema
```

#### Унаследованный от

[`PropertySchema`](PropertySchema.md).[`nestedProperties`](PropertySchema.md#nestedproperties)

***

### parameterIndex?

```ts
optional parameterIndex?: number;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:73](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L73)

***

### ref?

```ts
optional ref?: string;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:57](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L57)

#### Унаследованный от

[`PropertySchema`](PropertySchema.md).[`ref`](PropertySchema.md#ref)

***

### required?

```ts
optional required?: boolean;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:58](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L58)

#### Унаследованный от

[`PropertySchema`](PropertySchema.md).[`required`](PropertySchema.md#required)

***

### subSchemas?

```ts
optional subSchemas?: PropertySchema[];
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:64](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L64)

#### Унаследованный от

[`PropertySchema`](PropertySchema.md).[`subSchemas`](PropertySchema.md#subschemas)

***

### type?

```ts
optional type?: PropertySchema;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:63](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L63)

#### Унаследованный от

[`PropertySchema`](PropertySchema.md).[`type`](PropertySchema.md#type)

***

### validationStrategy?

```ts
optional validationStrategy?: ValidationStrategy;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:59](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L59)

#### Унаследованный от

[`PropertySchema`](PropertySchema.md).[`validationStrategy`](PropertySchema.md#validationstrategy)

***

### validators?

```ts
optional validators?: Partial<Record<ValidatorKey, {
  errorMsg?: string;
  value?: unknown;
}>>;
```

Определено в: [packages/runtime/src/routeGeneration/tsoa-route.ts:65](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/routeGeneration/tsoa-route.ts#L65)

#### Унаследованный от

[`PropertySchema`](PropertySchema.md).[`validators`](PropertySchema.md#validators)
