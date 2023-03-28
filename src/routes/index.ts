import Router from 'express'
import authRouter from './authRouter'
import usersRouter from './usersRouter'
import routesRouter from './routesRouter'
import busRouter from './busesRouters'
import agenciesRouter from './agenciesRouter'

const router = Router()
router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/routes', routesRouter)
router.use("/buses",busRouter)
router.use("/agencies",agenciesRouter)

export default router
