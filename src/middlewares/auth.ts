import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/jwt.utils';
import client from '../utils/connectRedisUtils';
import ResponseUtil from '../utils/responseUtil'
import { FORBIDDEN, INTERNAL_SERVER_ERROR } from 'http-status';

/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */
export const authorize = (allowedAccessTypes: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    let jwt = req.headers.authorization;

    // verify request has token
    if (!jwt) {
      return ResponseUtil.handleError(FORBIDDEN,'Invalid token ');
    }

    // remove Bearer if using Bearer Authorization mechanism
    if (jwt.toLowerCase().startsWith('bearer')) {
      jwt = jwt.slice('bearer'.length).trim();
    }

    // verify token hasn't expired yet
    client.get(jwt).then(async(value)=>{
      if (value === 'revoked') return ResponseUtil.handleError(FORBIDDEN, 'Your token is not valid' );;
      const decodedToken = await validateToken(jwt as string);

      const hasAccessToEndpoint = allowedAccessTypes.length < 1 ? true : allowedAccessTypes.some(
        (at) => decodedToken.accessTypes.some((uat: string) => uat === at)
      );
  
      if (!hasAccessToEndpoint) {
        return ResponseUtil.handleError(FORBIDDEN, 'You are not authorized to access this endpoint');
      }
    }).catch((error)=>{
       return ResponseUtil.handleError(INTERNAL_SERVER_ERROR,"error occured while trying to verify your token");

    })

    next();
  } catch (error:any) {
    if (error.name === 'TokenExpiredError') {
      return ResponseUtil.handleError(FORBIDDEN,'Expired token' );
      
    }

   return ResponseUtil.handleError(INTERNAL_SERVER_ERROR,'Failed to authenticate user' );
  }
};