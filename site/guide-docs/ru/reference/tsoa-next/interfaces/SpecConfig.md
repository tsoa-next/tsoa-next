---
lastUpdated: 2026-04-20T21:59:41.345Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / SpecConfig

# Интерфейс: SpecConfig

Определено в: [packages/runtime/src/config.ts:79](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L79)

OpenAPI настройки генерации.

## Свойства

### basePath?

```ts
optional basePath?: string;
```

Определено в: [packages/runtime/src/config.ts:163](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L163)

Базовый путь API; например, «v1» https://myapi.com/v1

***

### contact?

```ts
optional contact?: object;
```

Определено в: [packages/runtime/src/config.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L135)

Контактная информация для опубликованного API.

#### email?

```ts
optional email?: string;
```

Адрес электронной почты контактного лица/организации.

##### Default

```ts
npm package author email
```

#### name?

```ts
optional name?: string;
```

Имя контактного лица/организации.

##### Default

```ts
npm package author
```

#### url?

```ts
optional url?: string;
```

URL указывает на контактную информацию.

##### Default

```ts
npm package author url
```

***

### description?

```ts
optional description?: string;
```

Определено в: [packages/runtime/src/config.ts:124](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L124)

Описание API; по умолчанию npm описание упаковки

***

### disableBasePathPrefixSlash?

```ts
optional disableBasePathPrefixSlash?: boolean;
```

Определено в: [packages/runtime/src/config.ts:170](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L170)

Контролирует ли `basePath` префиксируется с `/` когда сочинять OpenAPI 3 URL сервера.

Доступен только в версии 3 или 3.1.

***

### host?

```ts
optional host?: string;
```

Определено в: [packages/runtime/src/config.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L88)

Имя хоста API Swagger 2 выход, например `localhost:3000`.

***

### license?

```ts
optional license?: string;
```

Определено в: [packages/runtime/src/config.ts:158](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L158)

Лицензия API; по умолчанию npm Лицензия на пакет при наличии

***

### name?

```ts
optional name?: string;
```

Определено в: [packages/runtime/src/config.ts:119](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L119)

Имя API; по умолчанию npm название пакета

***

### operationIdTemplate?

```ts
optional operationIdTemplate?: string;
```

Определено в: [packages/runtime/src/config.ts:197](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L197)

Шаблонная строка для генерации операционных идентификаторов.
Это должен быть действительный шаблон рулевой панели и предоставляется
со следующим контекстом:
  - "контроллер" Имя - Струнное имя класса контроллера.
  - "Метод" - Цоа. Объект метода.

#### Default

```ts
'{{titleCase method.name}}'
```

***

### outputDirectory

```ts
outputDirectory: string;
```

Определено в: [packages/runtime/src/config.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L83)

Каталог, в котором должен быть написан сгенерированный файл спецификации.

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

Определено в: [packages/runtime/src/config.ts:232](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L232)

Применяет безопасность по умолчанию ко всему API.
Можно переборщить с `@Security(...)` или `@NoSecurity()` Декораторы на контроллерах или методах.

***

### schemes?

```ts
optional schemes?: Protocol[];
```

Определено в: [packages/runtime/src/config.ts:215](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L215)

Поддерживаемые протоколы для Swagger 2 выход.

***

### securityDefinitions?

```ts
optional securityDefinitions?: object;
```

Определено в: [packages/runtime/src/config.ts:202](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L202)

Схемы безопасности, заявленные для спецификации.

#### Индексная подпись

```ts
[name: string]: SecuritySchemes
```

***

### servers?

```ts
optional servers?: string[];
```

Определено в: [packages/runtime/src/config.ts:95](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L95)

URL сервера для OpenAPI 3 выход.

Доступен только в версии 3 или 3.1.

***

### spec?

```ts
optional spec?: unknown;
```

Определено в: [packages/runtime/src/config.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L176)

Объект слился с генерируемым спецификацией.
Генерируемые свойства всегда имеют приоритет над приведенными здесь значениями.

***

### specFileBaseName?

```ts
optional specFileBaseName?: string;
```

Определено в: [packages/runtime/src/config.ts:102](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L102)

Базовое имя Сваггера. Джейсон или Сваггер. Ямл.

@default: "swagger"

***

### specMerging?

```ts
optional specMerging?: "recursive" | "immediate" | "deepmerge";
```

Определено в: [packages/runtime/src/config.ts:186](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L186)

Контролирует как `spec` объединены в сгенерированный документ.
Возможные значения:
 - «Немедленное» перекрывает только элементы верхнего уровня.
 - «Рекурсивный» выполняет глубокое слияние `merge`.
 - «Deepmerge» выполняет глубокое слияние `ts-deepmerge`В том числе и массивы.

#### Default

```ts
'immediate'
```

***

### specVersion?

```ts
optional specVersion?: SupportedSpecMajorVersion;
```

Определено в: [packages/runtime/src/config.ts:114](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L114)

майор OpenAPI версия для генерации; по умолчанию для версии 2, если не указано
Возможные значения:
 - 2: генерировать OpenAPI версия 2.
 - 3: генерировать OpenAPI версия 3.
 - 3.1: генерирует OpenAPI Версия 3.1.

***

### tags?

```ts
optional tags?: Tag[];
```

Определено в: [packages/runtime/src/config.ts:209](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L209)

Метаданные тегов верхнего уровня для генерируемой спецификации.

***

### termsOfService?

```ts
optional termsOfService?: string;
```

Определено в: [packages/runtime/src/config.ts:130](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L130)

Ссылка на страницу, которая описывает условия обслуживания.
Должно быть в формате URL.

***

### useTitleTagsForInlineObjects?

```ts
optional useTitleTagsForInlineObjects?: boolean;
```

Определено в: [packages/runtime/src/config.ts:226](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L226)

Добавляет заголовки к встроенным схемам ответа и объекта запроса-тела для улучшения генерации клиентов.

***

### version?

```ts
optional version?: string;
```

Определено в: [packages/runtime/src/config.ts:105](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L105)

Номер версии API; по умолчанию версия пакета.

***

### xEnumVarnames?

```ts
optional xEnumVarnames?: boolean;
```

Определено в: [packages/runtime/src/config.ts:221](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L221)

Поддержка x-enum-varnames

#### Default

```ts
false
```

***

### yaml?

```ts
optional yaml?: boolean;
```

Определено в: [packages/runtime/src/config.ts:212](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L212)

Сгенерированная спецификация записывается как YAML вместо JSON.
