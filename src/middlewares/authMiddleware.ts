import dotenv from 'dotenv'
import { Response, NextFunction } from 'express';
import { UNAUTHORIZED, INTERNAL_SERVER_ERROR } from 'http-status';

import { verifyToken } from '../utils/jwtUtil';
import ResponseUtil from '../utils/responseUtil'
import  authRepository  from '../modules/auth/repository/authRepository';


dotenv.config() 

const userAuthorization = (roles: any) => async (req: any, res: Response, next: NextFunction) => {
  try {
    const access_token = req.headers.authorization?.replace("Bearer", "");
    if (!access_token) {
      ResponseUtil.handleError(UNAUTHORIZED, "Invalid token");
      return ResponseUtil.response(res);
    }
    console.log("hello")
    const decodedToken = verifyToken(access_token, process.env.PUBLIC_KEY as string);
    console.log("hello",decodedToken)
    const userSession = await authRepository.getUserSessionByUserId(decodedToken.user_id);
    if (!userSession) {
      ResponseUtil.handleError(UNAUTHORIZED, "Invalid token");
      return ResponseUtil.response(res);
    }
  
    const user = await authRepository.getUserById(decodedToken.user_id)
   
    if (!user || !roles.includes(user.role)){
      ResponseUtil.handleError(UNAUTHORIZED, "Not authorized");
      return ResponseUtil.response(res);
    }

    req.admin = user;
    next();
  } catch (error: any) {
    ResponseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return ResponseUtil.response(res);
  }
}

const authorizationToken = async (req: any, res: Response, next: NextFunction) => {
  try {
    const access_token = req.headers.authorization?.split(" ")[1];
    if (!access_token) {
      ResponseUtil.handleError(UNAUTHORIZED, "Invalid token");
      return ResponseUtil.response(res);
    }

    const decodedToken = verifyToken(access_token, process.env.PUBLIC_KEY as string);
    const userSession = await authRepository.getUserSessionByUserId(decodedToken.user_id);
    if (!userSession) {
      ResponseUtil.handleError(UNAUTHORIZED, "Invalid token");
      return ResponseUtil.response(res);
    }

    const user = await authRepository.getUserById(decodedToken.user_id);
    if (!user){
      ResponseUtil.handleError(UNAUTHORIZED, "Not authorized");
      return ResponseUtil.response(res);
    }

    req.user = user;
    next();
  } catch (error: any) {
    ResponseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return ResponseUtil.response(res);
  }
}

export { userAuthorization, authorizationToken }