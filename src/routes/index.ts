import Router from 'express'
import usersRouter from './usersRouter'
import routesRouter from './routesRouter'
import authRouter from './authRouter'

const router = Router()
router.use('/users', usersRouter)
router.use('/routes', routesRouter)
router.use('/auth', authRouter)

export default router
