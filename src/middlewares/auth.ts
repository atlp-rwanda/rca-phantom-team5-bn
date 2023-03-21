import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/jwtUtil';
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
      return ResponseUtil.handleError(FORBIDDEN, 'Invalid token ');
    }

    // remove Bearer if using Bearer Authorization mechanism
    if (jwt.toLowerCase().startsWith('bearer')) {
      jwt = jwt.slice('bearer'.length).trim();
    }

    // verify token hasn't expired yet

    const isRevoked = await checkRevoked(jwt as string);

    if (isRevoked) return ResponseUtil.handleError(FORBIDDEN, 'Your token is not valid');


    const decodedToken = await validateToken(jwt as string);

    const hasAccessToEndpoint = hasAcess(allowedAccessTypes, decodedToken);

    if (!hasAccessToEndpoint) {
      return ResponseUtil.handleError(FORBIDDEN, 'You are not authorized to access this endpoint');
    }

    next();
  } catch (error: any) {
    return ResponseUtil.handleError(INTERNAL_SERVER_ERROR, 'Failed to authenticate user');
  }
};

const checkRevoked = async (jwt: string) => {
  try {
    const value = await client.get(jwt);
    if (value === 'revoked') return false;
    return true;
  } catch (error) {
    return false;
  }
}

const hasAcess = (allowedAccessTypes: string[], decodedToken: any) => {
  const hasAccessToEndpoint = allowedAccessTypes.length < 1 ? true : allowedAccessTypes.some(
    (at) => decodedToken.accessTypes.some((uat: string) => uat === at)
  );
  return hasAccessToEndpoint;
}