import Router from 'express'
import authRouter from './authRouter'
import usersRouter from './usersRouter'
import routesRouter from './authRouter'
import busRouter from './busesRouters'
import adminsRouter from './adminsRouter'

const router = Router()
router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/routes', routesRouter)
router.use("/buses",busRouter)
router.use('/admins', adminsRouter)

export default router
