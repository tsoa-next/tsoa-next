---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createEmbeddedSpecGenerator

# 函数: 创建 EmbededSpecGenerator ()

```ts
function createEmbeddedSpecGenerator(artifacts): SpecGenerator;
```

定义如下: [packages/tsoa/src/spec.ts:21](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L21)

从预建中创建运行时间光谱生成器 OpenAPI 文物嵌入到生成的路由代码中.
这保持内置 `SpecPath` 目标独立于源文件和 TypeScript 应请求时间进行分析。

## 参数

### artifacts

[`EmbeddedSpecGeneratorArtifacts`](../interfaces/EmbeddedSpecGeneratorArtifacts.md)

## 回返

[`SpecGenerator`](../interfaces/SpecGenerator.md)
