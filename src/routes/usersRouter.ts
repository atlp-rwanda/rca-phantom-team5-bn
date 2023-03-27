import { Router } from 'express'
import { authorizationToken } from '../middlewares/authMiddleware'
import usersController from '../modules/users/controller/usersController'
import { validateUpdateUser } from '../modules/users/validator/userValidator'

const usersRouter = Router()

usersRouter
	.get('/get-users', usersController.getUsers)
	.get('/get-profile', authorizationToken, usersController.getUser)
	.put('/update-profile/:id', authorizationToken, validateUpdateUser, usersController.updateProfile)
																
export default usersRouter