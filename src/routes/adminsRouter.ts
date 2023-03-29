import { Router } from 'express'
import { userAuthorization } from '../middlewares/authMiddleware'
import usersController from '../modules/users/controller/usersController'

const adminsRouter = Router()

adminsRouter
	.get('/get-user/:id', userAuthorization(['admin','super_admin']), usersController.getUserById)
																
export default adminsRouter