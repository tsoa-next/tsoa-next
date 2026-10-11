# Dependency Maintenance

This document records how repository dependencies are selected, audited, and intentionally held. It separates consumer compatibility from the toolchain used to maintain the monorepo.

## Current audit snapshot

The October 11, 2026 security repair reviewed 37 open GitHub Dependabot alerts across 14 packages. The repaired lockfile selects patched versions for the 36 alerts with published compatible fixes; GitHub will recalculate default-branch alerts after merge. The remaining reviewed alert is `sprintf-js` (#144).

A fresh npm audit also identified `qs` and `braces` advisories outside that reviewed alert inventory. Ordinary compatible resolution selects patched `qs@6.16.0`. `braces` has no patched release and remains separately documented below. The final audit reports 22 affected dependency nodes (16 high, six moderate), propagated from two direct advisories: `braces` and `sprintf-js`. These counts are not 22 independent vulnerabilities.

No dependency is copied, forked, patched in place, or hidden behind a repository-owned vendor wrapper. The only root override remains the existing compatible Vite pin.

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

Optional peer ranges are compatibility contracts, not requests to install one exact newest version. Existing supported lower bounds remain in place where a newer tested release is already included by the range. Express retains both the 4.x and full stable 5.x lines through `^4.21.0 || ^5.0.0`, and Joi retains both the 17.x and 18.x lines. CI tests the current Express 5.x release throughout the Node.js and operating-system matrix, plus every earlier stable Express 5.x release available at the time of this refresh on Linux and Node.js 24.

## Remaining root override

The only root override is `vite@6.4.3`. VitePress 1.6.4 accepts Vite 5 or 6 but otherwise resolves a vulnerable Vite release. Pinning the patched compatible Vite 6 release also selects a patched esbuild without overriding esbuild directly. Remove this override when VitePress's own dependency floor selects a patched release.

## Remaining upstream-blocked advisories

### sprintf-js

Dependabot [alert #144](https://github.com/tsoa-next/tsoa-next/security/dependabot/144), [GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c), affects `sprintf-js` through 1.1.3; no patched release is available. Installed paths include `gray-matter -> js-yaml 3 -> argparse 1 -> sprintf-js` and Changesets' `@manypkg/get-packages -> read-yaml-file -> js-yaml 3 -> argparse 1 -> sprintf-js`. The compatible YAML 3 update fixes YAML's own advisories but retains this dependency.

### braces

[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) affects `braces` through its latest release, 3.0.3; no patched release is available. Installed paths reach `micromatch -> braces` through Changesets' config/git modules and through `globby -> fast-glob` in Changesets' older workspace discovery and the Nolebase documentation changelog plugin.

Both dependencies belong to development/documentation tooling and are absent from the published packages' runtime dependency paths. This review did not establish attacker-controlled input reaching either vulnerable operation; that does not establish immunity. Keep the advisories visible until a compatible upstream fix is available. Replacing their tooling parents requires a separate qualified migration; incompatible overrides, vendoring and removal of documentation features are not repairs.

### Resolved AWS CDK exception

`aws-cdk-lib@2.273.0` contains bundled `brace-expansion@5.0.12`, verified in the installed published archive. The previous exception for CDK 2.261.0's bundled 5.0.6 is removed. Existing custom/serverless route generation and type checking pass with the updated package.

## Consumer updates

This repair preserves consumer Node requirements, TypeScript 5.9, supported framework majors and all optional peer ranges, including Joi 17/18. It requires no application, framework or compiler migration. Consumers with existing lockfiles may need to refresh their lockfile to select compatible patched transitive versions. Repository overrides do not propagate to consumers; fresh consumer installation must independently select patched shipped dependencies.

## Update policy

For dependency pull requests:

1. Inspect direct and workspace dependencies against current npm registry metadata.
2. Compare GitHub Actions references with their current upstream releases and review major-version migration notes.
3. Review GitHub Dependabot, code-scanning, and secret-scanning results.
4. Prefer direct upgrades, then supported lockfile resolutions, then a narrow compatible override.
5. Preserve public peer ranges unless testing establishes a real compatibility break.
6. Run the full build, lint, CommonJS test, ESM test, documentation build, README synchronization check, and npm audit.
7. Record every intentional hold, pre-release selection, remaining override, and unresolved advisory in this document and the pull request.
