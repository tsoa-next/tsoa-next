#!/usr/bin/env node
import { runCLI } from '@tsoa-next/cli/dist/runCLI'

if (require.main === module) {
  void (async () => {
    try {
      await runCLI()
    } catch (err) {
      console.error('tsoa cli error:\n', err)
      process.exit(1)
    }
  })()
}
