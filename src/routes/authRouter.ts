import { Router } from 'express'
import authController from '../modules/auth/controllers/authController'
import { validSignIn } from '../modules/auth/validation/authValidator'

const routesRouter = Router()

routesRouter
	.post('/signin', validSignIn, authController.signIn)

export default routesRouter