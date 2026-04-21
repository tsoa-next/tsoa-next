---
title: FAQ
lang: es-ES
lastUpdated: 2026-04-17T20:53:42.040Z
---

# FAQ

## Can Uso OpenAPI 3 o 3.1 en lugar de OpenAPI 2 (antes) Swagger)?

Sí. Set `spec.specVersion` a `3` o `3.1` en tu `tsoa.json` archivo. Ver más opciones de configuración en [`Config`](./reference/tsoa-next/interfaces/Config.md) Referencia de API.

## ¿Cómo uso? tsoa con koa, hapi u otros marcos?

Establecer la propiedad de middleware en su tsoa Config. Fuera de la caja, express, hapi y koa son soportados.
También puede proporcionar una plantilla personalizada, para más información, por favor regístrese [the guide](./templates.md)

## Cómo garantizar que no haya propiedades adicionales en tiempo de ejecución

Por defecto, OpenAPI permite que los modelos tengan [`additionalProperties`](https://swagger.io/docs/specification/data-models/dictionaries/). Si desea asegurarse en tiempo de ejecución que los datos sólo tienen las propiedades definidas en sus modelos, establezca los `noImplicitAdditionalProperties` opción en [`Config`](./reference/tsoa-next/interfaces/Config.md) a ambos `"silently-remove-extras"` o `"throw-on-extras"`.
Caveats:

- Los siguientes tipos siempre permitirán propiedades adicionales debido a la naturaleza de la forma en que trabajan:
  - El `any` Tipo
  - Tipo indexado (que permite explícitamente propiedades adicionales) como `export interface IStringToStringDictionary { [key: string] : string }`- Si usted está usando tsoa para un servicio existente que tiene consumidores...
  - usted tendrá que informar a sus consumidores antes de establecer `noImplicitAdditionalProperties` a `"throw-on-extras"` ya que sería un cambio de ruptura (debido al hecho de que los cuerpos de solicitud que anteriormente trabajaban ahora recibirían un error).
- Independientemente, `"noImplicitAdditionalProperties" : "silently-remove-extras"` es una gran opción tanto para APIs heredadas como nuevas (ya que esto refleja el comportamiento de los serializadores C# y otros serializadores JSON populares).

## Tratar con nombres de modelos duplicados

Si tiene múltiples modelos con el mismo nombre, puede obtener errores indicando que hay múltiples modelos de coincidencia. Si desea designar una clase/interfaz como la versión 'canónica' de un modelo, agregue un elemento jsdoc marcando como tal:

```ts
/**
 * @tsoaModel
 */
export interface MyModel {
  ...
}
```

## ¿Cómo puedo sacar el máximo provecho de mi OEA?

Ahora que tienes un OpenAPI Especificación (OAS) (swagger.json), puede utilizar todo tipo de herramientas increíbles que generan documentación, SDKs cliente, y más [here](http://openapi.tools).

## Cómo anular límite para validar grandes arrays (con más de 20 elementos)

Por defecto [Express](https://github.com/expressjs/express) usos [qs](https://github.com/ljharb/qs) como parser internamente, y su limitación predeterminada para validar 20 elementos en array
para anular esto debe añadir la siguiente configuración a su configuración expresa:

```ts
const app = express()

app.set('query parser', function (str) {
  return qs.parse(str, { arrayLimit: Infinity })
})

app.use(bodyParser.json())
app.use(Router())
```

Tenga en cuenta que debe colocarlo encima de otro middleware.
