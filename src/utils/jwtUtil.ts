import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

import dotenv from 'dotenv'

dotenv.config()

/**
 * generates JWT used for local testing
 */

interface TokenPayload {
  user_id:string
}

/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
export function validateToken(token: string,publicKey:string): Promise<TokenPayload> {

  const verifyOptions: VerifyOptions = {
    algorithms: ['RS256'],
  };

  return new Promise((resolve, reject) => {
    verify(token, publicKey, verifyOptions, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as TokenPayload);
      }

  });
})

}


const generateToken =(payload: object,  key: string): string =>{
 return sign(payload, key, { expiresIn: '24h' });
};

export { generateToken }
