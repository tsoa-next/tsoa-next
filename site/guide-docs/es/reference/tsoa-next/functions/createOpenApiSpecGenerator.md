---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createOpenApiSpecGenerator

# Función: crearApiSpecGenerator()

```ts
function createOpenApiSpecGenerator(config?): SpecGenerator;
```

Definido en: [packages/tsoa/src/spec.ts:63](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L63)

Crea un generador de espectro de tiempo de ejecución que construye lazily OpenAPI documento una vez por ejemplo generador `@tsoa-next/cli`,
entonces se bloquea el objeto de espectro generado y cadenas serializadas para lecturas posteriores.

## Parámetros

### config?

[`RuntimeSpecConfigSnapshot`](../interfaces/RuntimeSpecConfigSnapshot.md)

## Devoluciones

[`SpecGenerator`](../interfaces/SpecGenerator.md)
