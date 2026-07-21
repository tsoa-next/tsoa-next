# Security Policy

If you have a security issue to report, please contact us at [vanna@dicatania.me](mailto:vanna@dicatania.me).

Please do not open a public issue for an undisclosed vulnerability. Include the affected package and version, a minimal reproduction, the impact you observed, and any known mitigations. We will acknowledge the report and coordinate disclosure and remediation with you.

## Dependency security posture

Dependency updates are reviewed against both GitHub Dependabot alerts and `npm audit`. We prefer direct upgrades and upstream fixes. Root-level `overrides` are reserved for compatible transitive fixes that cannot yet be selected through a direct dependency; every remaining override must stay visible in the root `package.json` and is expected to be removed when its parent dependency catches up.

The complete audit snapshot, version holds, and override rationale are maintained in [Dependency Maintenance](docs/DEPENDENCIES.md).

The repository currently has one accepted audit exception: `aws-cdk-lib@2.261.0` bundles `brace-expansion@5.0.6`. The vulnerable copy is embedded in the AWS CDK package, so npm cannot replace it with an override or `npm audit fix`. AWS CDK is used only by a custom route-generator test fixture and is not included in any published `tsoa-next` package. We will upgrade as soon as AWS CDK publishes a release with the patched bundled dependency.

The supported TypeScript baseline for repository builds and generated-schema regression tests is 5.9. A TypeScript 6 trial changed generated schema output, while TypeScript 7 is outside the current TypeDoc and typescript-eslint peer ranges. Adopting either compiler line requires an explicit compatibility review rather than a dependency-only update.
