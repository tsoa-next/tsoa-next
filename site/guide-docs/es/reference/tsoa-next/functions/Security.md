---
lastUpdated: 2026-04-20T21:59:41.341Z
---
[tsoa-next](../../packages.md) / [tsoa-next](../index.md) / Security

# Función: Seguridad()

```ts
function Security(name, scopes?): ClassDecorator & MethodDecorator;
```

Definido en: [packages/runtime/src/decorators/security.ts:16](https://github.com/tsoa-next/tsoa-next/blob/main/packages/runtime/src/decorators/security.ts#L16)

Declara el requisito de seguridad para un controlador o acción.

## Parámetros

### name

  \| `string`
  \| \{
\[`name`: `string`\]: `string`[];
\}

The security scheme name, or a full security requirement object.

### scopes?

`string`[]

OAuth scopes required by the scheme when `name` es una cuerda.

## Devoluciones

`ClassDecorator` & `MethodDecorator`
