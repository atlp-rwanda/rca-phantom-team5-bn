import { Router } from 'express'
import { userAuthorization } from '../middlewares/middleware'
import busesRoutesController from '../modules/buses_routes/controller/busesRoutesController'
import { validBusesRoutes } from '../modules/buses_routes/validator/busesRoutesValidator'

const busesRoutesRouter = Router()

busesRoutesRouter
	.post('/assign-bus', userAuthorization(['operator']), validBusesRoutes, busesRoutesController.createBusToRoute)
	.get('/assigned-bus', userAuthorization(['operator']), busesRoutesController.listAssignments)
																
export default busesRoutesRouter