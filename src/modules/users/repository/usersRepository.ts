import models from "../../../database/models/index";
import { verifyToken } from "../../../utils/jwtUtil";
const { users } = models;
import { Sequelize } from "sequelize-typescript";

const getUsers = async () => {
  return await users.findAll({ order: [["id", "ASC"]] });
};
const getUser = async (id: string) => {
  return await users.findOne({ where: { id } });
};

const getProfile = async (token: string) => {
  const {user_id} = verifyToken(token, process.env.SECRET_KEY as string);
  return await users.findOne({ where: { id:user_id} });
};

const getUserByEmail = async (email: string) => {
  return await users.findOne({ where: { email } });
};

const updateUser = async (access_token: string, data: any) => {
  const {user_id} = verifyToken(access_token, process.env.SECRET_KEY as string);
  if(await users.update(data, { where: { id: user_id }})){
    return await users.findOne({ where: { id:user_id } });
  }
  return "Something went wrong";
};
export default { getUsers, getUser, getUserByEmail, updateUser,getProfile };
