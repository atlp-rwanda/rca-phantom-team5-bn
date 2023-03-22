import { Router } from 'express'
import OperatorsContoller from '../modules/users/controller/OperatorsContoller'
import registerDriversContoller from '../modules/users/controller/DriversContoller'
import operatorsRepository from '../modules/users/repository/operatorsRepository'

const adminsRouter = Router()

adminsRouter
	.post('/driver/add-new',registerDriversContoller.RegisterDrivers)
	.get('/driver/list-all', registerDriversContoller.listOfDriver)
    .post('/operator/add-new',OperatorsContoller.RegisterOperator)
    .get('/operator/list-all',OperatorsContoller.listOfOperators)

export default adminsRouter;