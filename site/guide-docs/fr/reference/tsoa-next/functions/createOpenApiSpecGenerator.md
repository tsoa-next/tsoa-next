---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createOpenApiSpecGenerator

# Fonction: créerOpenApiSpecGenerator()

```ts
function createOpenApiSpecGenerator(config?): SpecGenerator;
```

Définie dans : [packages/tsoa/src/spec.ts:63](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L63)

Crée un générateur spec runtime qui construit paresseusement le OpenAPI documenter une fois par instance du générateur en utilisant `@tsoa-next/cli`,
puis cache l'objet spec généré et les chaînes sérialisées pour les lectures ultérieures.

## Paramètres

### config?

[`RuntimeSpecConfigSnapshot`](../interfaces/RuntimeSpecConfigSnapshot.md)

## Retourne

[`SpecGenerator`](../interfaces/SpecGenerator.md)
