import { expect } from 'chai';
import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import 'mocha';
import { generateRoutes } from '@tsoa/cli';

describe('RouteGenerator inherited routes', () => {
  it('emits routes declared on a base class and a child class', async () => {
    const tmpRoot = await fs.mkdtemp(join(tmpdir(), 'tsoa-inherited-routes-'));
    const routesDir = join(tmpRoot, 'generated-routes');
    const controllerFile = join(tmpRoot, 'inheritedController.ts');

    const source = `
      import { Controller, Get, Route } from '@tsoa/runtime';

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
    `;

    try {
      await fs.writeFile(controllerFile, source, 'utf8');

      await generateRoutes({
        bodyCoercion: true,
        controllerPathGlobs: [controllerFile],
        entryFile: '',
        middleware: 'express',
        noImplicitAdditionalProperties: 'silently-remove-extras',
        routesDir,
      });

      const generatedRoutes = await fs.readFile(join(routesDir, 'routes.ts'), 'utf8');
      expect(generatedRoutes).to.contain("'/inherited/from-base'");
      expect(generatedRoutes).to.contain("'/inherited/from-child'");
    } finally {
      await fs.rm(tmpRoot, { force: true, recursive: true });
    }
  });
});
