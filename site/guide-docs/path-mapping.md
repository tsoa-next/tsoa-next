### Path mapping

Per the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) under [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html):

> Sometimes modules are not directly located under baseUrl. For instance, an import to a module "jquery" would be translated at runtime to "node_modules\jquery\dist\jquery.slim.min.js". Loaders use a mapping configuration to map module names to files at run-time, see RequireJs documentation and SystemJS documentation.
>
> The TypeScript compiler supports the declaration of such mappings using "paths" property in tsconfig.json files. Here is an example for how to specify the "paths" property for jquery.

```js
{
  "compilerOptions": {
    "baseUrl": ".", // This must be specified if "paths" is.
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"] // This mapping is relative to "baseUrl"
    }
  }
}
```

If you have a project that uses this functionality, you can configure the internal generators either by:

- letting `tsoa-next` read compiler options from a `tsconfig.json`
- overriding specific values with `compilerOptions` in your `tsoa` config

`tsconfig.json` is an input source, not the final authority. The precedence is:

1. TypeScript internal defaults
2. resolved `tsconfig.json`
3. explicit `compilerOptions` in `tsoa` config

If `tsconfig` is omitted, `tsoa-next` looks for `tsconfig.json` starting from the loaded `tsoa` config directory. If `tsconfig` is provided, it is resolved relative to that config file.

```js
{
  "tsconfig": "./tsconfig.json",
  "spec": {
    ...
  },
  "routes": {
    ...
  },
  "compilerOptions": {
    "baseUrl": "./path/to/base/url",
    "paths": {
      "exampleLib": ["./path/to/example/lib"]
    }
  }
}
```

You can also continue to provide compiler options directly when you do not want to rely on `tsconfig.json`.

```js
{
  "spec": {
    ...
  },
  "routes": {
    ...
  },
   "compilerOptions": {
        "baseUrl": "./path/to/base/url",
        "paths": {
            "exampleLib": "./path/to/example/lib"
        }
    }
}
```
