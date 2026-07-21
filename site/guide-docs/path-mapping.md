### Path mapping

TypeScript's [`paths` compiler option](https://www.typescriptlang.org/tsconfig/paths.html) remaps import specifiers for type resolution. It does not rewrite emitted imports, so your runtime or bundler must understand the same aliases.

`baseUrl` is not required for `paths` and is deprecated in TypeScript 6. Prefer paths relative to the `tsconfig.json` file:

```js
{
  "compilerOptions": {
    "paths": {
      "@app/*": ["./src/*"]
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
        "paths": {
            "exampleLib": ["./path/to/example/lib"]
        }
    }
}
```
