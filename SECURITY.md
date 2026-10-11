# Security Policy

If you have a security issue to report, please contact us at [vanna@dicatania.me](mailto:vanna@dicatania.me).

Please do not open a public issue for an undisclosed vulnerability. Include the affected package and version, a minimal reproduction, the impact you observed, and any known mitigations. We will acknowledge the report and coordinate disclosure and remediation with you.

## Dependency security posture

Dependency updates are reviewed against both GitHub Dependabot alerts and `npm audit`. We prefer direct upgrades and upstream fixes. Root-level `overrides` are reserved for compatible transitive fixes that cannot yet be selected through a direct dependency; every remaining override must stay visible in the root `package.json` and is expected to be removed when its parent dependency catches up.

The complete audit snapshot, version holds, and override rationale are maintained in [Dependency Maintenance](docs/DEPENDENCIES.md).

Two development/documentation dependencies remain upstream-blocked: `sprintf-js` ([GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c), Dependabot alert #144) through front-matter/YAML tooling, and `braces` ([GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)) through micromatch and glob tooling. Neither has a patched published release, and neither is a shipped runtime dependency. The dependency maintenance document records their installed paths and audit propagation. We have not established attacker-controlled input reaching the vulnerable operations; we keep the advisories visible rather than claiming immunity or dismissing them. Compatible upstream updates are preferred over vendoring, incompatible overrides or unqualified tooling migrations.

The previous AWS CDK audit exception is resolved: `aws-cdk-lib@2.273.0` bundles patched `brace-expansion@5.0.12`.

The supported TypeScript baseline for repository builds and generated-schema regression tests is 5.9. A TypeScript 6 trial changed generated schema output, while TypeScript 7 is outside the current TypeDoc and typescript-eslint peer ranges. Adopting either compiler line requires an explicit compatibility review rather than a dependency-only update.
