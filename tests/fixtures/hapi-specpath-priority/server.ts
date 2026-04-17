import { Server } from '@hapi/hapi'
import '../controllers/specPathPriorityDynamicController'
import '../controllers/specPathController'
import { RegisterRoutes } from './routes'

export const server = new Server({})
;(RegisterRoutes as (server: Server) => void)(server)

export const ready = server.start()
