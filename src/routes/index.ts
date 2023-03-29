import Router from 'express'
import authRouter from './authRouter'
import usersRouter from './usersRouter'
import adminsRouter from './adminsRouter'

const router = Router()
router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/admins', adminsRouter)

export default router
