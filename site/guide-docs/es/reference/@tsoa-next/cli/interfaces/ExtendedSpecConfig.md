---
lastUpdated: 2026-04-20T21:59:41.368Z
---
[tsoa-next](../../../packages.md) / [@tsoa-next/cli](../index.md) / ExtendedSpecConfig

# Interfaz: ExtendedSpecConfig

Definido en: [cli/src/api.ts:387](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L387)

Config normalizado de generación de espectro devuelto por [validateSpecConfig](../functions/validateSpecConfig.md).

## Extensión

- `SpecConfig`

## Propiedades

### basePath?

```ts
optional basePath?: string;
```

Definido en: [packages/runtime/src/config.ts:163](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L163)

Base API path; por ejemplo, el 'v1' en https://myapi.com/v1

#### Inhered from

```ts
SpecConfig.basePath
```

***

### contact?

```ts
optional contact?: object;
```

Definido en: [packages/runtime/src/config.ts:135](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L135)

Información de contacto para la API publicada.

#### email?

```ts
optional email?: string;
```

La dirección de correo electrónico de la persona de contacto/organización.

##### Default

```ts
npm package author email
```

#### name?

```ts
optional name?: string;
```

El nombre de identificación de la persona de contacto/organización.

##### Default

```ts
npm package author
```

#### url?

```ts
optional url?: string;
```

URL señalando la información de contacto.

##### Default

```ts
npm package author url
```

#### Inhered from

```ts
SpecConfig.contact
```

***

### controllerPathGlobs?

```ts
optional controllerPathGlobs?: string[];
```

Definido en: [cli/src/api.ts:390](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L390)

***

### description?

```ts
optional description?: string;
```

Definido en: [packages/runtime/src/config.ts:124](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L124)

Descripción de API; predeterminados a npm descripción del paquete

#### Inhered from

```ts
SpecConfig.description
```

***

### disableBasePathPrefixSlash?

```ts
optional disableBasePathPrefixSlash?: boolean;
```

Definido en: [packages/runtime/src/config.ts:170](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L170)

Controles si `basePath` está prefijado con `/` cuando se compone OpenAPI 3 URLs del servidor.

Solo disponible con la versión 3 o 3.1.

#### Inhered from

```ts
SpecConfig.disableBasePathPrefixSlash
```

***

### entryFile

```ts
entryFile: string;
```

Definido en: [cli/src/api.ts:388](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L388)

***

### host?

```ts
optional host?: string;
```

Definido en: [packages/runtime/src/config.ts:88](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L88)

Nombre de host API Swagger 2 productos, por ejemplo `localhost:3000`.

#### Inhered from

```ts
SpecConfig.host
```

***

### license?

```ts
optional license?: string;
```

Definido en: [packages/runtime/src/config.ts:158](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L158)

Licencia API; predeterminados a npm licencia de paquete cuando presente

#### Inhered from

```ts
SpecConfig.license
```

***

### name?

```ts
optional name?: string;
```

Definido en: [packages/runtime/src/config.ts:119](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L119)

Nombre de API; predeterminados a npm nombre del paquete

#### Inhered from

```ts
SpecConfig.name
```

***

### noImplicitAdditionalProperties

```ts
noImplicitAdditionalProperties: "ignore" | "throw-on-extras" | "silently-remove-extras";
```

Definido en: [cli/src/api.ts:389](https://github.com/tsoa-next/tsoa-next/blob/main/packages/cli/src/api.ts#L389)

***

### operationIdTemplate?

```ts
optional operationIdTemplate?: string;
```

Definido en: [packages/runtime/src/config.ts:197](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L197)

Cadena de plantilla para generar ids de operación.
Esta debe ser una plantilla de manillar válida y se proporciona
con el siguiente contexto:
  - 'controlador Nombre - Nombre de la clase de controlador.
  - - Tsoa. Método objeto.

#### Default

```ts
'{{titleCase method.name}}'
```

#### Inhered from

```ts
SpecConfig.operationIdTemplate
```

***

### outputDirectory

```ts
outputDirectory: string;
```

Definido en: [packages/runtime/src/config.ts:83](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L83)

Directorio donde se debe escribir el archivo de espectro generado.

#### Inhered from

```ts
SpecConfig.outputDirectory
```

***

### rootSecurity?

```ts
optional rootSecurity?: Security[];
```

Definido en: [packages/runtime/src/config.ts:232](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L232)

Aplica una seguridad predeterminada a toda la API.
Puede ser superado `@Security(...)` o `@NoSecurity()` decoradores en controladores o métodos.

#### Inhered from

```ts
SpecConfig.rootSecurity
```

***

### schemes?

```ts
optional schemes?: Protocol[];
```

Definido en: [packages/runtime/src/config.ts:215](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L215)

Protocolos de apoyo para Swagger 2 salida.

#### Inhered from

```ts
SpecConfig.schemes
```

***

### securityDefinitions?

```ts
optional securityDefinitions?: object;
```

Definido en: [packages/runtime/src/config.ts:202](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L202)

Planes de seguridad declarados para la especificación.

#### Index Signature

```ts
[name: string]: SecuritySchemes
```

#### Inhered from

```ts
SpecConfig.securityDefinitions
```

***

### servers?

```ts
optional servers?: string[];
```

Definido en: [packages/runtime/src/config.ts:95](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L95)

URL de servidor para OpenAPI 3 salidas.

Solo disponible con la versión 3 o 3.1.

#### Inhered from

```ts
SpecConfig.servers
```

***

### spec?

```ts
optional spec?: unknown;
```

Definido en: [packages/runtime/src/config.ts:176](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L176)

Objeto fusionado en la especie generada.
Las propiedades generadas siempre tienen prioridad sobre los valores proporcionados aquí.

#### Inhered from

```ts
SpecConfig.spec
```

***

### specFileBaseName?

```ts
optional specFileBaseName?: string;
```

Definido en: [packages/runtime/src/config.ts:102](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L102)

Base-nombre de intercambio. Json o Swagger. Yaml.

@default: "swagger"

#### Inhered from

```ts
SpecConfig.specFileBaseName
```

***

### specMerging?

```ts
optional specMerging?: "immediate" | "recursive" | "deepmerge";
```

Definido en: [packages/runtime/src/config.ts:186](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L186)

Controla cómo `spec` se fusiona en el documento generado.
Valores posibles:
 - "inmediato" anula sólo elementos de alto nivel.
 - 'recursivo' realiza una fusión profunda usando `merge`.
 - 'deepmerge' realiza una fusión profunda usando `ts-deepmerge`, incluyendo arrays.

#### Default

```ts
'immediate'
```

#### Inhered from

```ts
SpecConfig.specMerging
```

***

### specVersion?

```ts
optional specVersion?: SupportedSpecMajorVersion;
```

Definido en: [packages/runtime/src/config.ts:114](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L114)

Major OpenAPI versión para generar; predeterminados a la versión 2 cuando no se especifica
Valores posibles:
 - 2: genera OpenAPI versión 2.
 - 3: genera OpenAPI versión 3.
 - 3.1: genera OpenAPI versión 3.1.

#### Inhered from

```ts
SpecConfig.specVersion
```

***

### tags?

```ts
optional tags?: Tag[];
```

Definido en: [packages/runtime/src/config.ts:209](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L209)

Metadatos de etiquetas de alto nivel para la especificación generada.

#### Inhered from

```ts
SpecConfig.tags
```

***

### termsOfService?

```ts
optional termsOfService?: string;
```

Definido en: [packages/runtime/src/config.ts:130](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L130)

Enlace a la página que describe los términos de servicio.
Debe estar en el formato URL.

#### Inhered from

```ts
SpecConfig.termsOfService
```

***

### useTitleTagsForInlineObjects?

```ts
optional useTitleTagsForInlineObjects?: boolean;
```

Definido en: [packages/runtime/src/config.ts:226](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L226)

Añade títulos para la respuesta en línea y los esquemas de objeto de petición para mejorar la generación de clientes.

#### Inhered from

```ts
SpecConfig.useTitleTagsForInlineObjects
```

***

### version?

```ts
optional version?: string;
```

Definido en: [packages/runtime/src/config.ts:105](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L105)

Número de versión API; predeterminado a la versión del paquete.

#### Inhered from

```ts
SpecConfig.version
```

***

### xEnumVarnames?

```ts
optional xEnumVarnames?: boolean;
```

Definido en: [packages/runtime/src/config.ts:221](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L221)

Soporte de x-enum-varnames

#### Default

```ts
false
```

#### Inhered from

```ts
SpecConfig.xEnumVarnames
```

***

### yaml?

```ts
optional yaml?: boolean;
```

Definido en: [packages/runtime/src/config.ts:212](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/config.ts#L212)

Escribe la especificaciones generadas como YAML en lugar de JSON.

#### Inhered from

```ts
SpecConfig.yaml
```
