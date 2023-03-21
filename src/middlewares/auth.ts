import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/jwtUtil';
import client from '../utils/connectRedisUtils';
import ResponseUtil from '../utils/responseUtil'
import { FORBIDDEN, INTERNAL_SERVER_ERROR } from 'http-status';



const isAuthorized = (allowedAccessTypes: string[], decodedToken: any) => {
  return allowedAccessTypes.length === 0 || decodedToken.accessTypes.some((accessType: string) => allowedAccessTypes.includes(accessType));
}

/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */

export const authorize = (allowedAccessTypes: string[]=[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwt = req.headers.authorization?.replace('Bearer ', '');
    if (!jwt) {
      return ResponseUtil.handleError(FORBIDDEN, 'Invalid token');
    }

    const isValid = await isTokenValid(jwt);
    if (!isValid) {
      return ResponseUtil.handleError(FORBIDDEN, 'Your token is not valid');
    }

    const decodedToken = await validateToken(jwt);
    const hasAccessToEndpoint = isAuthorized(allowedAccessTypes, decodedToken);
    if (!hasAccessToEndpoint) {
      return ResponseUtil.handleError(FORBIDDEN, 'You are not authorized to access this endpoint');
    }

    next();
  } catch (error: any) {
    return ResponseUtil.handleError(INTERNAL_SERVER_ERROR, 'Failed to authenticate user');
  }
};

const isTokenValid = async (jwt: string) => {
  const value = await client.get(jwt);
  return value === 'revoked' ? false : true;
}