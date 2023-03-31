import Router from 'express'
import authRouter from './authRouter'
import usersRouter from './usersRouter'
import adminsRouter from './adminsRouter'
import routeRouter from './routesRouter'



const router = Router()
router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/admins', adminsRouter)
router.use("/routes", routeRouter)


export default router
