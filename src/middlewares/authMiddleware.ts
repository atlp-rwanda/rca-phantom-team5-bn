import dotenv from 'dotenv'

import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/jwtUtil';
import ResponseUtil from '../utils/responseUtil'
import { FORBIDDEN, INTERNAL_SERVER_ERROR } from 'http-status';
import getUserSession from '../services/sessionService';

dotenv.config()

const isTokenValid = async (jwt: string,user_id:string) => {
  try {
    const session = await getUserSession(user_id)
    if(session.access_token  == jwt){
       return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

const isAuthorized = (allowedAccessTypes: string[], decodedToken: any) => {
  if (allowedAccessTypes.length === 0) {
    return true;
  }
  for (const accessType of decodedToken.accessTypes) {
    if (allowedAccessTypes.includes(accessType)) {
      return true;
    }
  }

  return false;
};


export const authorize = (allowedAccessTypes: string[]=[]) => async (req: Request, res: Response, next: NextFunction) => {
 
    const jwt = req.headers.authorization?.replace('Bearer ', '');
    if (!jwt){
      ResponseUtil.handleError(FORBIDDEN, 'Invalid token')
      return ResponseUtil.response(res)
      
      ;}

    const decodedToken = await validateToken(jwt,process.env.PUBLIC_KEY as string);

    const hasAccess = isAuthorized(allowedAccessTypes, decodedToken);
    if (!hasAccess) {
      ResponseUtil.handleError(FORBIDDEN, 'You are not authorized to access this endpoint')
      return ResponseUtil.response(res)
    };

    const isValid = await isTokenValid(jwt,decodedToken.user_id);
    if (!isValid){ 
     
       ResponseUtil.handleError(FORBIDDEN, 'Your token is not valid')
       return ResponseUtil.response(res)
    };

    next();
};
