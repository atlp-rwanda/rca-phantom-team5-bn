import { Router } from 'express'
import usersController from '../modules/users/controller/usersController'
import { validateUpdateUser } from '../modules/users/validator/userValidator'

const usersRouter = Router()

usersRouter
	.get('/get-users', usersController.getUsers)
	.get('/get-users/:id', usersController.getUser)
	.put('/update-profile/:id', validateUpdateUser, usersController.updateProfile)

export default usersRouter