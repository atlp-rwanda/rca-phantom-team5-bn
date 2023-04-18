import { Router } from 'express';
import authController from '../modules/auth/controllers/authController';
import { authorizationToken, userAuthorization } from '../middlewares/middleware';
import { validRegisterUser, validSignIn, validResetPassword } from '../modules/auth/validation/authValidator';

const routesRouter = Router();

routesRouter
	.post('/register-user', userAuthorization(['admin','super_admin']), validRegisterUser, authController.registerUsers)
	.delete('/logout', authorizationToken, authController.logout)
	.post('/signin', validSignIn, authController.signIn)
	.post('/reset-password-email', authController.resetPasswordEmail)
	.put('/reset-password/:token', validResetPassword, authController.resetPassword);
export default routesRouter;
 