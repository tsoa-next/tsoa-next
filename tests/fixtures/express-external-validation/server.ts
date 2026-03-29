import * as bodyParser from 'body-parser'
import * as express from 'express'
import '../controllers/externalValidationController'
import { RegisterRoutes } from './routes'

export const app: express.Express = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

RegisterRoutes(app, {
  validation: {
    translate: key => `translated:${key}`,
  },
})

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const status = err.status || 500
  res.status(status).json({
    fields: err.fields || undefined,
    message: err.message || 'An error occurred during the request.',
    name: err.name,
    status,
  })
})
