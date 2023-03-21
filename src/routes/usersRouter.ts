import { Router } from 'express'
import registerDriversContoller from '../modules/users/controller/registerDriversContoller'
import usersController from '../modules/users/controller/usersController'

const usersRouter = Router()

usersRouter.get('/get-users', usersController.getUsers)
usersRouter.get('/get-users/:id', usersController.getUser)
usersRouter.post('/admin/add-new',registerDriversContoller.RegisterDrivers);
	

export default usersRouter