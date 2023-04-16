import { Router } from 'express'
import { userAuthorization } from '../middlewares/middleware'
import usersController from '../modules/users/controller/usersController'
import { validateUpdateUser } from '../modules/users/validator/userValidator'

const usersRouter = Router()

usersRouter
	.get('/get-users', usersController.getUsers)
	.get("/get-drivers", userAuthorization(['operator']), usersController.getDrivers)
	.get('/get-profile', userAuthorization(['operator', 'driver', 'adamin', 'super_admin']), usersController.getProfile)
	.put('/update-profile', userAuthorization(['operator', 'driver', 'adamin', 'super_admin']), validateUpdateUser, usersController.updateProfile)

export default usersRouter