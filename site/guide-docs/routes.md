# Consuming generated routes

You have two options for how to tell tsoa where it can find the controllers that it will use to create the auto-generated `routes.ts` file.

## Using automatic controllers discovery

You can tell `tsoa-next` to use automatic controller discovery by providing one or more [minimatch globs](http://www.globtester.com/) in the top-level `controllerPathGlobs` field of your [config](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts) file (for example `tsoa.json`).

Pros:

- New developers can add a controller without having to know how tsoa "crawls" for the controllers. As long as their controller is caught by the glob that you provide, the controller will be added to the OpenAPI documentation and to the auto-generated `routes.ts` file.

Cons:

- It can be slightly slower than the alternative explicit-import approach because tsoa needs to expand and load the configured globs.

As you can see from the the controllers globs patterns below, you can provide multiple globs of various patterns:

```js
{
  "entryFile": "...",
  "controllerPathGlobs": [
    "./dir-with-controllers/*",
    "./recursive-dir/**/*",
    "./custom-filerecursive-dir/**/*.controller.ts"
  ],
  "routes": {
    "routesDir": "...",
    "middleware": "..."
  }
}
```

## Manually telling tsoa which controllers to use in the app entry file

If you omit `controllerPathGlobs`, tsoa can crawl the application entry file and follow controller imports that have the `@Route` decorator.

Pros:

- Route generation will usually be faster because tsoa follows your explicit imports instead of expanding globs.

Cons:

- New developers on your team might add a controller and not understand why the new controller was not exposed to the router or the OpenAPI generation. If that is a problem for you, prefer `controllerPathGlobs`.

```typescript
import * as methodOverride from 'method-override'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { RegisterRoutes } from './routes'

// ########################################################################
// controllers need to be referenced in order to get crawled by the generator
import './users/usersController'
// ########################################################################

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())

RegisterRoutes(app)

app.listen(3000)
```
