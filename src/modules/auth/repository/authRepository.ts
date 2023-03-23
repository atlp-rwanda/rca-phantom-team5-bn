import dotenv from 'dotenv'
import models from '../../../database/models/index'
import { generateToken, validateToken } from '../../../utils/jwtUtil'
import { generateUserPassword, hashPassword } from '../../../utils/passwordUtils'
const {users, users_sessions } = models 


dotenv.config()

const getUserByEmail = async (email: string) => {
  return await users.findOne({ where: { email } });
};

const getUserByNid = async (nid: string) => {
  return await users.findOne({ where: { nid } });
};


const registerUsers = async (data:any)=>{
   const genPassword = await generateUserPassword();
   const password = hashPassword(genPassword);
   data.password = password;

   const createdUser = await users.create(data)
   return { createdUser, genPassword };
 }

const createUserSession = async (data: any) => {
  const access_token = generateToken({user_id: data.user_id}, process.env.SECRET_KEY as string);
  data.access_token = access_token;
  const userSession = await users_sessions.create(data)
  return userSession;
}

const deleteUserSession =async(token: string)=>{
  try{
  const {user_id} =  await validateToken(token,process.env.PUBLIC_KEY as string)
  const session  = await users_sessions.findOne({ where: { user_id } })
  await session.update({access_token: "revoked"});
  await session.save()
   return true
  }catch{
    return false
  }



}

export default { getUserByEmail, getUserByNid, registerUsers, createUserSession,deleteUserSession }