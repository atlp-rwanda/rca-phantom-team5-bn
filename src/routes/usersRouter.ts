import { Router } from 'express'
import OperatorsContoller from '../modules/users/controller/OperatorsContoller'
import registerDriversContoller from '../modules/users/controller/registerDriversContoller'
import usersController from '../modules/users/controller/usersController'

const usersRouter = Router()

usersRouter.get('/get-users', usersController.getUsers)
usersRouter.get('/get-users/:id', usersController.getUser)
usersRouter.post('/admin/add-new',registerDriversContoller.RegisterDrivers);
usersRouter.get('/admin/all-drivers',registerDriversContoller.listOfDriver);
usersRouter.post('/admin/add-operator',OperatorsContoller.RegisterOperator);
usersRouter.get('/admin/operators/all',OperatorsContoller.listOfOperators);
	

export default usersRouter