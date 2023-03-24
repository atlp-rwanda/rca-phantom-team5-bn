import { sign, verify } from 'jsonwebtoken';


const generateToken = (payload: object, key: string, expiresIn: string): string => {
  return sign(payload, key,{ expiresIn, allowInsecureKeySizes: true });

};

const verifyToken = (token: string, key: string): any => {
  return verify(token.trim(), key);

};

export { generateToken, verifyToken }