---
lastUpdated: 2026-04-20T21:59:41.330Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / createEmbeddedSpecGenerator

# Fonction: createEmbeddedSpecGenerator()

```ts
function createEmbeddedSpecGenerator(artifacts): SpecGenerator;
```

Définie dans : [packages/tsoa/src/spec.ts:21](https://github.com/tsoa-next/tsoa-next/blob/main/packages/tsoa/src/spec.ts#L21)

Crée un générateur de spécifications d'exécution à partir d'un préconstruit OpenAPI artefact intégré au code de route généré.
Cela reste intégré `SpecPath` cibles indépendantes des fichiers sources et TypeScript analyse à la demande.

## Paramètres

### artifacts

[`EmbeddedSpecGeneratorArtifacts`](../interfaces/EmbeddedSpecGeneratorArtifacts.md)

## Retourne

[`SpecGenerator`](../interfaces/SpecGenerator.md)
