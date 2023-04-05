import Router from 'express'
import authRouter from './authRouter'
import usersRouter from './usersRouter'
import routesRouter from './authRouter'
import busRouter from './busesRouters'
import adminsRouter from './adminsRouter'
import driverRouter from './driversRouter'
import routeRouter from './routesRouter'



const router = Router()
router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/routes', routesRouter)
router.use("/buses",busRouter)
router.use('/admins', adminsRouter)
router.use("/drivers",driverRouter)
router.use("/routes", routeRouter)


export default router
