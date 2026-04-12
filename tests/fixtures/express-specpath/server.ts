import * as express from 'express'
import '../controllers/specPathController'
import { RegisterRoutes } from './routes'

export const app: express.Express = express()
;(RegisterRoutes as (app: express.Express) => void)(app)

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = err.status || 500
  res.status(status).json({
    message: err.message,
    name: err.name,
    status,
  })
})
