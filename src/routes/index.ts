import Router from 'express'
import usersRouter from './usersRouter'
import routesRouter from './routesRouter'

const router = Router()
router.use('/users', usersRouter)
router.use('/routes', routesRouter)

export default router
