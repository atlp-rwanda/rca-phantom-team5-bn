import { Router } from 'express';
import authController from '../modules/auth/controllers/authController';
import { authorizationToken, userAuthorization } from '../middlewares/authMiddleware';
import { validRegisterUser, validSignIn } from '../modules/auth/validation/authValidator';

const routesRouter = Router();

routesRouter
	.post('/register-user',userAuthorization(['admin','super_admin']), validRegisterUser, authController.registerUsers)
	.get('/logout', authorizationToken, authController.logout)
	.post('/signin', validSignIn, authController.signIn);
	
export default routesRouter;
