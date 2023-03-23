import Router from 'express'
import authRouter from './authRouter'
import usersRouter from './usersRouter'
import routesRouter from './routesRouter'

const router = Router()
router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/routes', routesRouter)

export default router
