---
lastUpdated: 2026-03-29T19:17:04.856Z
---
# Plantilla de ruta de eliminación

Si desea funcionalidad que tsoa no proporciona, entonces un poderoso (pero potencialmente costoso enfoque) es proporcionar tsoa con una plantilla de manillar personalizada para utilizar cuando se genera el archivo route.ts.

::: danger
Usar una plantilla personalizada significa que tendrá un tiempo más difícil migrando a nuevas versiones de tsoa ya que tu plantilla interactúa con la tsoa internos. Así que, para obtener las características más nuevas y mejores de tsoa, por favor utilice una de las plantillas proporcionadas seleccionando su elegido `"middleware"` (es decir, "koa", "express", o "hapi") y omitiendo `"middlewareTemplate"`.
:::

¿Pero por qué querrías anular la plantilla de ruta? ¿Qué?

- ¿Está usando un marco de servidor que todavía no soportamos? Si es así, entonces [please open an issue first](https://github.com/tsoa-next/tsoa-next/issues). Es probable que tratemos de aceptar tu plantilla personalizada como una de las nuevas opciones estándar. Si no podemos apoyar el nuevo marco, recomendaremos una plantilla de ruta personalizada.
- ¿Tiene un requisito muy específico? ¿Ya ha abierto un problema y tiene el tsoa ¿Los usuarios optaron por no apoyar esta característica? Entonces una plantilla personalizada podría resolver sus necesidades mejor.

Las plantillas de ruta se generan a partir de plantillas de manillar predefinidas. Puede anular y definir su propia plantilla para usar
definiéndolo en tu tsoaConfiguración json. Los caminos de ruta se generan en función del tipo de middleware que haya definido.

```js
{
  "entryFile": "...",
  "spec": {
    ...
  },
  "routes": {
    "routesDir": "...",
    "middleware": "express",
    "middlewareTemplate": "custom-template.ts",
    ...
  }
}
```
