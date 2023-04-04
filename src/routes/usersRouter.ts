import { Router } from 'express'
import { authorizationToken } from '../middlewares/middleware'
import usersController from '../modules/users/controller/usersController'
import { validateUpdateUser } from '../modules/users/validator/userValidator'
import { authorizationToken } from '../middlewares/authMiddleware'

const usersRouter = Router()

usersRouter
	.get('/get-users', usersController.getUsers)
	.put('/update-profile/:id', validateUpdateUser, usersController.updateProfile)
	.put('/update-profile/:id', authorizationToken, validateUpdateUser, usersController.updateProfile)
	.get('/get-profile', authorizationToken, usersController.getProfile)
	.put('/update-profile', authorizationToken, validateUpdateUser, usersController.updateProfile)

export default usersRouter