import Router from 'express'
import authRouter from './authRouter'
import usersRouter from './usersRouter'
import adminsRouter from './adminsRouter'
import stopRouter from './stopsRouters'



const router = Router()
router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/admins', adminsRouter)
router.use("/stops", stopRouter)


export default router
