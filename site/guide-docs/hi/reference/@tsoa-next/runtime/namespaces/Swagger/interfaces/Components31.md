---
lastUpdated: 2026-04-20T21:59:41.314Z
---
[tsoa-next](../../../../../packages.md) / [@tsoa-next/runtime](../../../index.md) / [Swagger](../index.md) / Components31

# इंटरफ़ेस: अवयव31

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:89](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L89)

## विस्तार

- `Omit`\<[`Components`](Components.md), `"schemas"`\>

## गुण

### callbacks?

```ts
optional callbacks?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:78](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L78)

#### सूचकांक हस्ताक्षर

```ts
[name: string]: unknown
```

#### से विरासत

[`Components`](Components.md).[`callbacks`](Components.md#callbacks)

***

### examples?

```ts
optional examples?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L79)

#### सूचकांक हस्ताक्षर

```ts
[name: string]: string | Example3
```

#### से विरासत

[`Components`](Components.md).[`examples`](Components.md#examples)

***

### headers?

```ts
optional headers?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:80](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L80)

#### सूचकांक हस्ताक्षर

```ts
[name: string]: unknown
```

#### से विरासत

[`Components`](Components.md).[`headers`](Components.md#headers)

***

### links?

```ts
optional links?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:81](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L81)

#### सूचकांक हस्ताक्षर

```ts
[name: string]: unknown
```

#### से विरासत

[`Components`](Components.md).[`links`](Components.md#links)

***

### parameters?

```ts
optional parameters?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:82](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L82)

#### सूचकांक हस्ताक्षर

```ts
[name: string]: Parameter3
```

#### से विरासत

[`Components`](Components.md).[`parameters`](Components.md#parameters)

***

### requestBodies?

```ts
optional requestBodies?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L83)

#### सूचकांक हस्ताक्षर

```ts
[name: string]: unknown
```

#### से विरासत

[`Components`](Components.md).[`requestBodies`](Components.md#requestbodies)

***

### responses?

```ts
optional responses?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:84](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L84)

#### सूचकांक हस्ताक्षर

```ts
[name: string]: Response
```

#### से विरासत

[`Components`](Components.md).[`responses`](Components.md#responses)

***

### schemas?

```ts
optional schemas?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:90](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L90)

#### सूचकांक हस्ताक्षर

```ts
[name: string]: Schema31
```

***

### securitySchemes?

```ts
optional securitySchemes?: object;
```

में परिभाषित: [packages/runtime/src/swagger/swagger.ts:86](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/swagger/swagger.ts#L86)

#### सूचकांक हस्ताक्षर

```ts
[name: string]: SecuritySchemes
```

#### से विरासत

[`Components`](Components.md).[`securitySchemes`](Components.md#securityschemes)
