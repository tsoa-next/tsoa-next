---
lastUpdated: 2026-03-22T05:01:23.358Z
---
### Cartografía

Per [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) menores [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html):

> A veces los módulos no están directamente ubicados bajo baseUrl. Por ejemplo, una importación a un módulo "jquery" se traduciría en tiempo de ejecución a "node_modules\jquery\dist\jquery.slim.min.js". Los cargadores utilizan una configuración de asignación para mapear nombres de módulos a archivos en tiempo de ejecución, ver documentación de RequireJs y documentación de SystemJS.
>> El TypeScript compilador apoya la declaración de tales mapas usando propiedades "paths" en archivos tsconfig.json. Aquí hay un ejemplo para cómo especificar la propiedad "paths" para jquery.

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

Si tiene un proyecto que utiliza esta funcionalidad, puede configurar los generadores internos por:

- Dejar `tsoa-next` read compilador opciones de un `tsconfig.json`- superando valores específicos con `compilerOptions` en tu `tsoa` config

`tsconfig.json` es una fuente de insumos, no la autoridad final. La precedencia es:

1. TypeScript predeterminados internos
2. resuelta `tsconfig.json`3. explícita `compilerOptions` dentro `tsoa` config

Si `tsconfig` está omitido, `tsoa-next` busca `tsconfig.json` a partir de la carga `tsoa` directorio de config. Si `tsconfig` se proporciona, se resuelve en relación con ese archivo de configuración.

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

También puede continuar proporcionando opciones de compilador directamente cuando no desea confiar en `tsconfig.json`.

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
