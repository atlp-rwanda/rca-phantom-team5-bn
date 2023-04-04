import { Router } from 'express';
import authController from '../modules/auth/controllers/authController';
import { authorizationToken, userAuthorization } from '../middlewares/middleware';
import { validRegisterUser, validSignIn } from '../modules/auth/validation/authValidator';

const routesRouter = Router();

routesRouter
	.post('/register-user',userAuthorization(['admin','super_admin']), validRegisterUser, authController.registerUsers)
	.delete('/logout', authorizationToken, authController.logout)
	.post('/signin', validSignIn, authController.signIn)
	.post('/reset-email',authController.resetPasswordEmail)
	.put('/password-reset/:userId/:token',authController.resetUserPassword);
	
export default routesRouter;
 