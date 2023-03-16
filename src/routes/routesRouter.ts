import { Router } from 'express'
import routesController from '../modules/routes/controller/routesController'

const routesRouter = Router()

routesRouter
	.get('/get-routes', routesController.getRoutes)
	.get('/get-routes/:id', routesController.getRoute)

export default routesRouter