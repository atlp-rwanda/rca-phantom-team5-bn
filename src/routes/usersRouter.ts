import { Router } from 'express'
import usersController from '../modules/users/controller/usersController'

const usersRouter = Router()

usersRouter
	.get('/get-users', usersController.getUsers)
	.get('/get-users/:id', usersController.getUser)

export default usersRouter