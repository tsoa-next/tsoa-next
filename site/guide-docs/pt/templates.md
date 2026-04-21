---
lastUpdated: 2026-03-29T19:17:04.856Z
---
# Substituir o modelo de rota

Se você quiser funcionalidade que tsoa não fornece, então uma abordagem poderosa (mas potencialmente dispendiosa) é fornecer tsoa com um modelo de guidão personalizado para usar ao gerar o arquivo routes.ts.

::: danger
Usando um modelo personalizado significa que você terá um momento mais difícil migrando para novas versões de tsoa uma vez que seu modelo interage com o tsoa internos. Então, para obter as mais novas e melhores características de tsoa, por favor use um dos modelos fornecidos selecionando o seu escolhido `"middleware"` (i.e. "koa", "expresso", ou "hapi") e omitindo `"middlewareTemplate"`.
:::

_Ok, mas por que você iria querer substituir o modelo de rota? _

- Você está usando um framework de servidor que ainda não suportamos? Se assim for, então [please open an issue first](https://github.com/tsoa-next/tsoa-next/issues). É provável que tentaremos aceitar seu modelo personalizado como uma das novas opções padrão. Se não pudermos suportar o novo framework, então recomendamos um modelo de rota personalizado.
- Tem uma exigência muito específica? Você já abriu um problema e tem o tsoa Os mantenedores optaram por não suportar este recurso? Então um modelo personalizado pode resolver suas necessidades melhor.

Modelos de rota são gerados a partir de modelos de guidão predefinidos. Você pode substituir e definir seu próprio modelo para usar
definindo- o na sua tsoaConfiguração .json. Caminhos de rota são gerados com base no tipo middleware que você definiu.

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
