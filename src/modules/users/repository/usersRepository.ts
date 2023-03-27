import models from "../../../database/models/index";
import { verifyToken } from "../../../utils/jwtUtil";
const { users } = models;

const getUsers = async () => {
  return await users.findAll({ order: [["id", "ASC"]] });
};

const getUser = async (token: string) => {
  const {user_id} = verifyToken(token, process.env.SECRET_KEY as string);
  return await users.findOne({ where: { id:user_id} });
};

const getUserByEmail = async (email: string) => {
  return await users.findOne({ where: { email } });
};

const updateUser = async (id: string, data: any) => {
  if(await users.update(data, { where: { id } })){
    return await users.findOne({ where: { id } });
  }
  return "Something went wrong";
};
export default { getUsers, getUser, getUserByEmail, updateUser };
