import dotenv from 'dotenv'
import { sign } from 'jsonwebtoken';

dotenv.config()

const generateToken =(payload: object,  key: string): string =>{
 return sign(payload, key, { expiresIn: '24h' });
};

export { generateToken }