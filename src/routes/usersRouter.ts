import { Router } from 'express'
import { userAuthorization } from '../middlewares/middleware'
import usersController from '../modules/users/controller/usersController'
import { validateUpdateUser } from '../modules/users/validator/userValidator'
import authController from '../modules/auth/controllers/authController'

const usersRouter = Router()

usersRouter
	.get('/get-users', usersController.getUsers)
	.get("/get-drivers", userAuthorization(['operator']), usersController.getDrivers)
	.get('/get-user/:id',  userAuthorization(['admin', 'super_admin']), usersController.getUser)
	.delete('/delete-user/:id', userAuthorization(['admin', 'super_admin']), usersController.deleteUsers)
	.get('/get-profile', userAuthorization(['operator', 'driver', 'admin', 'super_admin']), usersController.getProfile)
	.put('/update-profile', userAuthorization(['operator', 'driver', 'admin', 'super_admin']), validateUpdateUser, usersController.updateProfile)
    
export default usersRouter