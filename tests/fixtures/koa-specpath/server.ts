import * as Koa from 'koa'
import * as KoaRouter from '@koa/router'
import '../controllers/specPathController'
import { RegisterRoutes } from './routes'

const app = new Koa()
const router = new KoaRouter()

;(RegisterRoutes as (router: KoaRouter) => void)(router)

app.use(async (context, next) => {
  try {
    await next()
  } catch (err: any) {
    context.status = err.status || 500
    context.body = err.message
  }
})

app.use(router.routes()).use(router.allowedMethods())

export const server = app.listen()
