import dotenv from 'dotenv'
import models from '../../../database/models/index'
import { generateToken } from '../../../utils/jwtUtil'
const { users_sessions } = models  
dotenv.config()

const createUserSession = async (data: any) => {
  const access_token = generateToken({user_id: data.user_id}, process.env.SECRET_KEY as string);
  data.access_token = access_token;
  const userSession = await users_sessions.create(data)
  return userSession;
}

  
export default { createUserSession }