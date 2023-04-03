import Router from 'express'
import authRouter from './authRouter'
import usersRouter from './usersRouter'
import routesRouter from './authRouter'
import busRouter from './busesRouters'
import adminsRouter from './adminsRouter'
import routeRouter from './routesRouter'
import busesRoutesRouter from './busesRoutesRouters'



const router = Router()
router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/routes', routesRouter)
router.use("/buses",busRouter)
router.use('/admins', adminsRouter)
router.use("/routes", routeRouter)
router.use("/busesRoutes", busesRoutesRouter)


export default router
