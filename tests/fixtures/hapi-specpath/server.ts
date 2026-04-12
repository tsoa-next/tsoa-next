import { Server } from '@hapi/hapi'
import '../controllers/specPathController'
import { RegisterRoutes } from './routes'

export const server = new Server({})
;(RegisterRoutes as (server: Server) => void)(server)

server.start().catch(err => {
  if (err) {
    throw err
  }
})
