import Router from 'express'
import authRouter from './authRouter'
import usersRouter from './usersRouter'
import routesRouter from './routesRouter'
import busRouter from './busesRouters'

const router = Router()
router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/routes', routesRouter)
router.use("/buses",busRouter)

export default router
