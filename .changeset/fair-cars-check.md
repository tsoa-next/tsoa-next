---
'@tsoa-next/cli': patch
'tsoa-next': patch
---

Remediate the remaining metadata resolver quality issues without changing the public API surface.

This patch keeps the existing CLI contracts intact while reducing internal complexity, tightening default parsing behavior, and adding focused tests that lock in the non-breaking behavior.
