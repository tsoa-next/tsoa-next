---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createEmbeddedSpecGenerator

# Función: crearEmbeddedSpecGenerator()

```ts
function createEmbeddedSpecGenerator(artifacts): SpecGenerator;
```

Definido en: [packages/tsoa/src/spec.ts:21](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L21)

Crea un generador de espectro de tiempo de ejecución de un preconstruido OpenAPI artefacto incrustado en código de ruta generado.
Esto se mantiene incorporado `SpecPath` objetivos independientes de los archivos fuente y TypeScript análisis a la hora de solicitud.

## Parámetros

### artifacts

[`EmbeddedSpecGeneratorArtifacts`](../interfaces/EmbeddedSpecGeneratorArtifacts.md)

## Devoluciones

[`SpecGenerator`](../interfaces/SpecGenerator.md)
