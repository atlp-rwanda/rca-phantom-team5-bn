import dotenv from 'dotenv'
import models from '../../../database/models/index'
import { generateToken } from '../../../utils/jwtUtil'
import { generateUserPassword, hashPassword } from '../../../utils/passwordUtils'
const {users, users_sessions } = models 


dotenv.config()

const getUserByEmail = async (email: string) => {
  return await users.findOne({ where: { email } });
};

const getUserByNid = async (nid: string) => {
  return await users.findOne({ where: { nid } });
};

const getUserById = async (id: string) => {
  return await users.findOne({ where: { id } });
};

const registerUsers = async (data:any)=>{
   const genPassword = await generateUserPassword();
   const password = hashPassword(genPassword);
   data.password = password;

   const createdUser = await users.create(data)
   return { createdUser, genPassword };
 }

 const getUserSessionByUserId = async (user_id: string) => {
  return await users_sessions.findOne({ where: { user_id } })
};

const createUserSession = async (data: any) => {
  const access_token = generateToken({user_id: data.user_id}, process.env.SECRET_KEY as string,process.env.EXPIRES_IN as string);
  data.access_token = access_token;
  const userSession = await users_sessions.create(data)
  return userSession;
}

const deleteUserSession =async(user_id: string)=>{
   await users_sessions.destroy({ where: { user_id } }) 
}

export default { getUserByEmail, getUserByNid, getUserById, registerUsers, getUserSessionByUserId, createUserSession, deleteUserSession }