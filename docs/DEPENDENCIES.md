# Dependency Maintenance

This document records how repository dependencies are selected, audited, and intentionally held. It separates consumer compatibility from the toolchain used to maintain the monorepo.

## Current audit snapshot

The July 21, 2026 dependency refresh used the npm registry, `npm audit`, GitHub Dependabot, GitHub code scanning, and GitHub secret scanning as independent inputs.

- GitHub reported 19 open Dependabot alerts on `main` before the refresh. The upgraded lockfile selects patched versions for those alerts; GitHub will recalculate their state after the change reaches the default branch.
- GitHub code scanning and secret scanning reported no open alerts at the time of review.
- GitHub Actions dependencies were checked against their upstream releases and upgraded, including the Node 24 action-runtime lines for Checkout, Setup Node, Pages, Dependabot metadata, stale-item handling, GitHub App tokens, and GitHub Script.
- The first upgraded lockfile reported nine npm audit findings: two low, three moderate, and four high.
- Direct upgrades and npm's supported transitive resolutions removed eight of those nine findings.
- One high-severity audit finding remains accepted and is described below.
- The root manifest went from seven top-level override entries to one. No dependency is copied, forked, patched in place, or hidden behind a repository-owned vendor wrapper.

Reproduce the repository audit with:

```shell
npm ci --ignore-scripts
npm audit
```

## Intentional version decisions

### TypeScript 5.9

The compiler remains on `typescript@5.9.3`. The registry's latest TypeScript 7 release is outside the peer ranges declared by the current TypeDoc and typescript-eslint releases. A TypeScript 6 trial completed compilation but changed 41 generated-schema assertions in the full suite. Those changes require a dedicated output-compatibility review and are not appropriate for an otherwise mechanical dependency refresh. TypeScript 5.9 remains the tested schema baseline.

### Inversify 6 in the legacy fixture

The test fixture using `inversify-binding-decorators@4.0.0` remains on `inversify@6.2.2`, the newest compatible 6.x release. The binding-decorator package does not declare Inversify 7 or 8 compatibility. New application documentation uses native Inversify bindings; the fixture remains to protect existing consumers of the legacy integration.

### Mocha 12 release candidate

The test workspaces use `mocha@12.0.0-rc.2`. The latest stable Mocha 11 line still selects vulnerable `diff` and `serialize-javascript` versions. The release candidate natively selects patched versions and passes the repository's CommonJS and ESM suites without a forced transitive override. Mocha is test-only and is not shipped in the published packages.

### Node type definitions

The repository uses the latest `@types/node` release on the supported Node.js 22 line rather than Node.js 26 declarations. This prevents contributors from accidentally relying on APIs newer than the packages' minimum supported runtime.

### Optional peer dependencies

Optional peer ranges are compatibility contracts, not requests to install one exact newest version. Existing supported lower bounds remain in place where a newer tested release is already included by the range. Express retains both the 4.x and 5.x lines, and Joi retains both the 17.x and 18.x lines.

## Remaining root override

The only root override is `vite@6.4.3`. VitePress 1.6.4 accepts Vite 5 or 6 but otherwise resolves a vulnerable Vite release. Pinning the patched compatible Vite 6 release also selects a patched esbuild without overriding esbuild directly. Remove this override when VitePress's own dependency floor selects a patched release.

## Accepted upstream audit finding

`aws-cdk-lib@2.261.0` bundles `brace-expansion@5.0.6`, which is covered by [GHSA-3jxr-9vmj-r5cp](https://github.com/advisories/GHSA-3jxr-9vmj-r5cp). Because the dependency is bundled into the published AWS CDK artifact, npm cannot replace it through normal resolution, a root override, or `npm audit fix`. The latest AWS CDK release available during this review still contains that bundled copy.

AWS CDK is a development dependency used only to compile a custom route-generator fixture. It is absent from the dependency trees and packed contents of `@tsoa-next/cli`, `@tsoa-next/runtime`, and `tsoa-next`. The finding will be removed when AWS publishes a release with the patched bundled dependency. Replacing or patching AWS CDK locally would create an unmaintained vendor boundary and is intentionally out of scope.

## Update policy

For dependency pull requests:

1. Inspect direct and workspace dependencies against current npm registry metadata.
2. Compare GitHub Actions references with their current upstream releases and review major-version migration notes.
3. Review GitHub Dependabot, code-scanning, and secret-scanning results.
4. Prefer direct upgrades, then supported lockfile resolutions, then a narrow compatible override.
5. Preserve public peer ranges unless testing establishes a real compatibility break.
6. Run the full build, lint, CommonJS test, ESM test, documentation build, README synchronization check, and npm audit.
7. Record every intentional hold, pre-release selection, remaining override, and unresolved advisory in this document and the pull request.
