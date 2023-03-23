import { Router } from 'express'
import authController from '../modules/auth/controllers/authController'
import { validRegisterUser, validSignIn } from '../modules/auth/validation/authValidator'

const routesRouter = Router()

routesRouter
	.post('/register-user', validRegisterUser, authController.registerUsers)
	.post('/signin', validSignIn, authController.signIn)
	

export default routesRouter