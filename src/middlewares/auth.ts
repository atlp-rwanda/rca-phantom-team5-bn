import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/jwt.utils';
import client from '../utils/connectRedisUtils';

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
      return res.status(401).json({ message: 'Invalid token ' });
    }

    // remove Bearer if using Bearer Authorization mechanism
    if (jwt.toLowerCase().startsWith('bearer')) {
      jwt = jwt.slice('bearer'.length).trim();
    }

    // verify token hasn't expired yet
    client.get(jwt).then(async(value)=>{
      if (value === 'revoked') return res.status(401).json({ message: 'Your token is not valid' });;
      const decodedToken = await validateToken(jwt as string);

      const hasAccessToEndpoint = allowedAccessTypes.length < 1 ? true : allowedAccessTypes.some(
        (at) => decodedToken.accessTypes.some((uat: string) => uat === at)
      );
  
      if (!hasAccessToEndpoint) {
        return res.status(401).json({ message: 'No enough privileges to access endpoint' });
      }
    }).catch((error)=>{
       return res.status(500).json("error occured while trying to verify your token");

    })

    next();
  } catch (error:any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Expired token' });
      return;
    }

    res.status(500).json({ message: 'Failed to authenticate user' });
  }
};