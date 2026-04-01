#!/usr/bin/env node
export * from '@tsoa-next/cli'
import { runCLI } from '@tsoa-next/cli'

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
