import Router from 'express'
import usersRouter from './usersRouter'
import routesRouter from './routesRouter'
import adminsRouter from './adminsRouter'

const router = Router()
router.use('/users', usersRouter)
router.use('/routes', routesRouter)
router.use('/admin',adminsRouter);

export default router
