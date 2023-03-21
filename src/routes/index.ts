import Router from 'express'
import usersRouter from './usersRouter'
import routesRouter from './routesRouter'
import stopRouter from './stopsRouters'

const router = Router()
router.use('/users', usersRouter)
router.use('/routes', routesRouter)
router.use("/stops", stopRouter)

export default router
