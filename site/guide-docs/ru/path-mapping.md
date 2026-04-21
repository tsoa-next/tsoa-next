---
lastUpdated: 2026-03-22T05:01:23.358Z
---
### Картографирование путей

Согласно [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) под [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html):

> Иногда модули не располагаются непосредственно под базой Url. Например, импорт в модуль «jquery» будет переведен во время выполнения на «node_modules\jquery\dist\jquery.slim.min.js». Загрузчики используют конфигурацию отображения для отображения имен модулей для файлов во время выполнения, см. документацию RequireJs и документацию SystemJS.
>> The TypeScript Компилятор поддерживает декларирование таких отображений с использованием свойства «пути» в файлах tsconfig.json. Вот пример того, как указать свойство «путей» для запроса.

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

Если у вас есть проект, который использует эту функциональность, вы можете настроить внутренние генераторы:

- позволять `tsoa-next` читать параметры компилятора из `tsconfig.json`- Преобладающие специфические значения с `compilerOptions` в твоем `tsoa` конфигурация

`tsconfig.json` Это источник информации, а не окончательный орган власти. Преимуществом является:

1. TypeScript Внутренние дефолты
2. решенный `tsconfig.json`3. явный `compilerOptions` в `tsoa` конфигурация

Если `tsconfig` Опускается, `tsoa-next` искать `tsconfig.json` начиная с загруженного `tsoa` каталог конфигураций. Если `tsconfig` Предоставляется, решается относительно этого конфигурационного файла.

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

Вы также можете продолжать предоставлять параметры компилятора напрямую, когда вы не хотите полагаться на `tsconfig.json`.

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
