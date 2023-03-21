import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/jwtUtil';
import client from '../utils/connectRedisUtils';
import ResponseUtil from '../utils/responseUtil'
import { FORBIDDEN, INTERNAL_SERVER_ERROR } from 'http-status';

const isTokenValid = async (jwt: string) => {
  try {
    const value = await client.get(jwt);
    return value !== 'revoked';
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


export const authorize = (allowedAccessTypes: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwt = req.headers.authorization?.replace('Bearer ', '');
    if (!jwt){return ResponseUtil.handleError(FORBIDDEN, 'Invalid token');}

    const isValid = await isTokenValid(jwt);
    if (!isValid){return ResponseUtil.handleError(FORBIDDEN, 'Your token is not valid')};

    const decodedToken = await validateToken(jwt);
    const hasAccess = isAuthorized(allowedAccessTypes, decodedToken);
    if (!hasAccess) {return ResponseUtil.handleError(FORBIDDEN, 'You are not authorized to access this endpoint')};

    next();
  } catch {
    return ResponseUtil.handleError(INTERNAL_SERVER_ERROR, 'Failed to authenticate user');
  }
};
