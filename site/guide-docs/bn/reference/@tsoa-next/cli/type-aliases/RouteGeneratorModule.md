---
lastUpdated: 2026-04-20T21:59:41.308Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / RouteGeneratorModule

# ধরন: পয়েন্টারের ধরন\<Config\>

```ts
type RouteGeneratorModule<Config> = object;
```

নির্ধারিত মান: [cli/src/api.ts:545](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L545)

মডিউল আকৃতি প্রত্যাশিত যখন একটি স্বনির্ধারিত রুট জেনারেটর লোড করার সময় `routes.routeGenerator`. .

## পরামিতির পরামিতি

### Config

`Config` * xends * [`ExtendedRoutesConfig`](../interfaces/ExtendedRoutesConfig.md)

## বৈশিষ্ট্য

### default

```ts
default: (metadata, routesConfig) => object;
```

নির্ধারিত মান: [cli/src/api.ts:546](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L546)

#### পরামিতি

##### metadata

`Tsoa.Metadata`

##### routesConfig

`Config`

#### প্রাপ্ত মান

`object`

##### GenerateCustomRoutes

```ts
GenerateCustomRoutes: () => Promise<void>;
```

###### প্রাপ্ত মান

`Promise`\<`void`\>
