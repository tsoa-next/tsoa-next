/**
 * Run from tests/: node --expose-gc -r ts-node/register -r tsconfig-paths/register performance/benchmark.ts
 * Prints measurements only; generated outputs live in a temporary directory.
 * First-generation measurements exclude module loading and include compilation and both output writes.
 * Memory measurements include the ts-node harness; later fixtures run in the same warmed process.
 * Validation timings include fresh payloads and per-request errors; they are not HTTP throughput measurements.
 */
import { strict as assert } from 'node:assert'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { performance } from 'node:perf_hooks'
import { generateSpecAndRoutes } from '@tsoa-next/cli'
import { DefaultRouteGenerator } from '../../packages/cli/src/routeGeneration/defaultRouteGenerator'
import { FieldErrors, ValidationService } from '@tsoa-next/runtime'
import { getDefaultOptions } from '../fixtures/defaultOptions'
import { ModelService } from '../fixtures/services/modelService'

const samples = 3
const iterations = 10000
const directory = mkdtempSync(join(tmpdir(), 'tsoa-performance-'))
const mebibytes = (bytes: number) => Math.round((bytes / 1024 / 1024) * 100) / 100
const memory = () => ({ rssMiB: mebibytes(process.memoryUsage().rss), heapUsedMiB: mebibytes(process.memoryUsage().heapUsed) })

async function main() {
  const generation: Array<{ fixture: string; firstMs: number; repeatedMs: number[]; memory: ReturnType<typeof memory> }> = []
  let validationModels: ReturnType<DefaultRouteGenerator['buildModels']> | undefined
  for (const fixture of ['getController.ts', 'postController.ts', 'complexTypeController.ts']) {
    const config = getDefaultOptions(join(directory, 'spec'), resolve(__dirname, '../fixtures/controllers', fixture))
    delete config.controllerPathGlobs
    config.spec.specVersion = 3.1
    config.routes.routesDir = join(directory, 'routes')
    const elapsedMs: number[] = []
    for (let sample = 0; sample < samples; sample++) {
      global.gc?.()
      const start = performance.now()
      const metadata = await generateSpecAndRoutes({ configuration: structuredClone(config) })
      elapsedMs.push(Math.round((performance.now() - start) * 100) / 100)
      if (fixture === 'getController.ts' && !validationModels) {
        validationModels = new DefaultRouteGenerator(metadata, {
          entryFile: config.entryFile,
          routesDir: config.routes.routesDir,
          bodyCoercion: true,
          noImplicitAdditionalProperties: 'ignore',
        }).buildModels()
      }
    }
    generation.push({ fixture, firstMs: elapsedMs[0], repeatedMs: elapsedMs.slice(1), memory: memory() })
  }

  assert(validationModels?.TestModel, 'Existing getController fixture must supply TestModel')
  const service = new ModelService()
  const validator = new ValidationService(validationModels, { noImplicitAdditionalProperties: 'ignore', bodyCoercion: true })
  const validation: Array<{ payload: string; errorCount: number; firstMs: number; iterations: number; elapsedMs: number[]; microsecondsPerOperation: number[] }> = []
  for (const invalid of [false, true]) {
    const makePayload = () => {
      const payload = service.getModel()
      if (invalid) {
        Object.assign(payload, { id: 'invalid-number', boolValue: 'invalid-boolean' })
      }
      return payload
    }
    const validate = () => {
      const errors: FieldErrors = {}
      validator.ValidateParam({ ref: 'TestModel', required: true }, makePayload(), 'body', errors, true)
      return Object.keys(errors).length
    }
    const firstStart = performance.now()
    const errorCount = validate()
    const firstMs = performance.now() - firstStart
    assert.equal(errorCount > 0, invalid, 'Payload must exercise the expected validation outcome')
    for (let warmup = 0; warmup < 1000; warmup++) validate()
    const elapsedMs: number[] = []
    for (let sample = 0; sample < samples; sample++) {
      const start = performance.now()
      for (let iteration = 0; iteration < iterations; iteration++) validate()
      elapsedMs.push(performance.now() - start)
    }
    validation.push({ payload: invalid ? 'invalid TestModel' : 'valid TestModel', errorCount, firstMs, iterations, elapsedMs, microsecondsPerOperation: elapsedMs.map(ms => (ms * 1000) / iterations) })
  }
  console.log(
    JSON.stringify(
      {
        node: process.version,
        platform: process.platform,
        arch: process.arch,
        gcAvailable: Boolean(global.gc),
        samples,
        generation,
        validation,
        processPeakRssMiB: mebibytes(process.resourceUsage().maxRSS * 1024),
      },
      null,
      2,
    ),
  )
}

void main()
  .catch((error: unknown) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => rmSync(directory, { force: true, recursive: true }))
