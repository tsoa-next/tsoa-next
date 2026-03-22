---
'@tsoa-next/cli': patch
'@tsoa-next/runtime': patch
'tsoa-next': patch
---

Fix runtime handling of empty request bodies so absent bodies are treated as undefined.
