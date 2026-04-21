---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createOpenApiSpecGenerator

# 函数: 创建 OpenApiSpecGenerator ()

```ts
function createOpenApiSpecGenerator(config?): SpecGenerator;
```

定义如下: [packages/tsoa/src/spec.ts:63](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L63)

创建一个运行时光谱生成器,以懒散地构建 OpenAPI 每个生成实例使用一次文档 `@tsoa-next/cli`, (中文(简体) ).
然后缓存生成的 spec 对象和序列字符串供后续读取。

## 参数

### config?

[`RuntimeSpecConfigSnapshot`](../interfaces/RuntimeSpecConfigSnapshot.md)

## 回返

[`SpecGenerator`](../interfaces/SpecGenerator.md)
