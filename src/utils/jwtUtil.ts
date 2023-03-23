import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

import dotenv from 'dotenv'

dotenv.config()

/**
 * generates JWT used for local testing
 */

interface TokenPayload {
  exp: number;
  accessTypes: string[];
  name: string;
  userId: number;
}

/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
export function validateToken(token: string): Promise<TokenPayload> {
  const publicKey = fs.readFileSync(path.join(__dirname, './../../public.key'));

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
