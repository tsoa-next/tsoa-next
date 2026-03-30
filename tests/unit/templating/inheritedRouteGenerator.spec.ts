import { expect } from 'chai'
import { promises as fs } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import 'mocha'
import { generateRoutes } from '@tsoa-next/cli/module/generate-routes'
import { MetadataGenerator } from '@tsoa-next/cli/metadataGeneration/metadataGenerator'
import { spy } from 'sinon'
import * as ts from 'typescript'
import { CompilerOptions } from 'typescript'

type TempControllerPaths = {
  controllerFile: string
  routesDir: string
}

function getTempCompilerOptions(): CompilerOptions {
  const repoRoot = resolve(__dirname, '../../..')
  return {
    baseUrl: repoRoot,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    module: ts.ModuleKind.CommonJS,
    paths: {
      'tsoa-next': ['packages/tsoa/src/index.ts'],
      '@tsoa-next/runtime': ['packages/runtime/src/index.ts'],
      '@tsoa-next/runtime/*': ['packages/runtime/src/*'],
    },
    target: ts.ScriptTarget.ES2021,
  }
}

async function withTempController(source: string, run: (paths: TempControllerPaths) => Promise<void>) {
  const tmpRoot = await fs.mkdtemp(join(tmpdir(), 'tsoa-inherited-routes-'))
  const routesDir = join(tmpRoot, 'generated-routes')
  const controllerFile = join(tmpRoot, 'inheritedController.ts')

  try {
    await fs.writeFile(controllerFile, source, 'utf8')
    await run({ controllerFile, routesDir })
  } finally {
    await fs.rm(tmpRoot, { force: true, recursive: true })
  }
}

async function generateRoutesForController(paths: TempControllerPaths) {
  await generateRoutes(
    {
      bodyCoercion: true,
      controllerPathGlobs: [paths.controllerFile],
      entryFile: '',
      middleware: 'express',
      noImplicitAdditionalProperties: 'silently-remove-extras',
      routesDir: paths.routesDir,
    },
    getTempCompilerOptions(),
  )
}

async function readGeneratedRoutesFile(routesDir: string) {
  return await fs.readFile(join(routesDir, 'routes.ts'), 'utf8')
}

describe('RouteGenerator inherited routes', () => {
  it('emits routes declared on a base class and a child class', async () => {
    const source = `
      import { Controller, Get, Route } from '@tsoa-next/runtime';

      class BaseController extends Controller {
        @Get('from-base')
        public async fromBase(): Promise<string> {
          return 'base';
        }
      }

      @Route('inherited')
      export class ChildController extends BaseController {
        @Get('from-child')
        public async fromChild(): Promise<string> {
          return 'child';
        }
      }
    `

    await withTempController(source, async paths => {
      await generateRoutesForController(paths)
      const generatedRoutes = await readGeneratedRoutesFile(paths.routesDir)
      expect(generatedRoutes).to.contain("'/inherited/from-base'")
      expect(generatedRoutes).to.contain("'/inherited/from-child'")
    })
  })

  it('imports generated route helpers from tsoa-next for backwards compatibility', async () => {
    const source = `
      import { Controller, Get, Route } from 'tsoa-next';

      @Route('compat')
      export class CompatController extends Controller {
        @Get()
        public async get(): Promise<string> {
          return 'ok';
        }
      }
    `

    await withTempController(source, async paths => {
      await generateRoutesForController(paths)
      const generatedRoutes = await readGeneratedRoutesFile(paths.routesDir)

      expect(generatedRoutes).to.contain("from 'tsoa-next'")
      expect(generatedRoutes).not.to.contain("from '@tsoa-next/runtime'")
    })
  })

  it('uses the derived controller route prefix for inherited methods when base and derived routes differ', async () => {
    const source = `
      import { Controller, Get, Route } from '@tsoa-next/runtime';

      @Route('base')
      export class BaseController extends Controller {
        @Get('from-base')
        public async fromBase(): Promise<string> {
          return 'base';
        }
      }

      @Route('derived')
      export class ChildController extends BaseController {
        @Get('from-child')
        public async fromChild(): Promise<string> {
          return 'child';
        }
      }
    `

    await withTempController(source, async paths => {
      await generateRoutesForController(paths)
      const generatedRoutes = await readGeneratedRoutesFile(paths.routesDir)

      expect(generatedRoutes).to.contain("'/base/from-base'")
      expect(generatedRoutes).to.contain("'/derived/from-base'")
      expect(generatedRoutes).to.contain("'/derived/from-child'")
      expect(generatedRoutes).not.to.contain("'/base/from-child'")
    })
  })

  it('does not include inherited methods when the base class does not extend tsoa Controller', async () => {
    const source = `
      import { Controller, Get, Route } from '@tsoa-next/runtime';

      class PlainBase {
        @Get('from-base')
        public async fromBase(): Promise<string> {
          return 'base';
        }
      }

      @Route('inherited')
      export class ChildController extends PlainBase {
        @Get('from-child')
        public async fromChild(): Promise<string> {
          return 'child';
        }
      }
    `

    await withTempController(source, async paths => {
      await generateRoutesForController(paths)
      const generatedRoutes = await readGeneratedRoutesFile(paths.routesDir)

      expect(generatedRoutes).to.contain("'/inherited/from-child'")
      expect(generatedRoutes).not.to.contain("'/inherited/from-base'")
    })
  })

  it('rejects duplicate routes when inherited and child methods resolve to the same HTTP method and path', async () => {
    const source = `
      import { Controller, Get, Route } from '@tsoa-next/runtime';

      class BaseController extends Controller {
        @Get('duplicate')
        public async fromBase(): Promise<string> {
          return 'base';
        }
      }

      @Route('conflict')
      export class ChildController extends BaseController {
        @Get('duplicate')
        public async fromChild(): Promise<string> {
          return 'child';
        }
      }
    `

    await withTempController(source, async paths => {
      expect(() => {
        new MetadataGenerator(paths.controllerFile, getTempCompilerOptions()).Generate()
      }).to.throw(/Duplicate method signature @get\(conflict\/duplicate\) found in controllers/)
    })
  })

  it('warns on duplicate path-parameter signatures between inherited and child methods', async () => {
    const source = `
      import { Controller, Get, Route } from '@tsoa-next/runtime';

      class BaseController extends Controller {
        @Get('{id}')
        public async fromBase(): Promise<string> {
          return 'base';
        }
      }

      @Route('collisions')
      export class ChildController extends BaseController {
        @Get('{identifier}')
        public async fromChild(): Promise<string> {
          return 'child';
        }
      }
    `

    await withTempController(source, async paths => {
      const consoleWarn = spy(console, 'warn')

      try {
        new MetadataGenerator(paths.controllerFile, getTempCompilerOptions()).Generate()
        expect(
          consoleWarn.calledWith(
            'Duplicate path parameter definition signature found in controller ChildController [ method GET fromChild route: {identifier} ] collides with [ method GET fromBase route: {id} ]\n',
          ),
        ).to.be.true
      } finally {
        consoleWarn.restore()
      }
    })
  })

  it('rejects duplicate inherited route signatures across base and derived controllers with same route prefix', async () => {
    const source = `
      import { Controller, Get, Route } from '@tsoa-next/runtime';

      @Route('same')
      export class BaseController extends Controller {
        @Get('from-base')
        public async fromBase(): Promise<string> {
          return 'base';
        }
      }

      @Route('same')
      export class ChildController extends BaseController {
        @Get('from-child')
        public async fromChild(): Promise<string> {
          return 'child';
        }
      }
    `

    await withTempController(source, async paths => {
      expect(() => {
        new MetadataGenerator(paths.controllerFile, getTempCompilerOptions()).Generate()
      }).to.throw(/Duplicate method signature @get\(same\/from-base\) found in controllers: BaseController#fromBase, ChildController#fromBase/)
    })
  })

  it('prefers child method decorators when the child overrides an inherited method name', async () => {
    const source = `
      import { Controller, Get, Route } from '@tsoa-next/runtime';

      class BaseController extends Controller {
        @Get('from-base')
        public async shared(): Promise<string> {
          return 'base';
        }
      }

      @Route('override')
      export class ChildController extends BaseController {
        @Get('from-child')
        public async shared(): Promise<string> {
          return 'child';
        }
      }
    `

    await withTempController(source, async paths => {
      await generateRoutesForController(paths)
      const generatedRoutes = await readGeneratedRoutesFile(paths.routesDir)

      expect(generatedRoutes).to.contain("'/override/from-child'")
      expect(generatedRoutes).not.to.contain("'/override/from-base'")
    })
  })
})
