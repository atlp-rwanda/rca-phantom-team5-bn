import Router from 'express'
import usersRouter from './usersRouter'
import routesRouter from './routesRouter'
import busRouter from './busesRouters'

const router = Router()
router.use('/users', usersRouter)
router.use('/routes', routesRouter)
router.use("/buses",busRouter)

export default router
