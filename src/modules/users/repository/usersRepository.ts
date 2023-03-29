import models from "../../../database/models/index";
const { users } = models;

const getUsers = async () => {
  return await users.findAll({ order: [["id", "ASC"]] });
};
const getUser = async (id: string) => {
  return await users.findOne({ where: { id } });
};

const getProfile = async (user_id: number) => {
  return await users.findOne({ where: { id:user_id} });
};

const getUserByEmail = async (email: string) => {
  return await users.findOne({ where: { email } });
};

const updateUser = async (user_id: number, data: any) => {
  if(await users.update(data, { where: { id: user_id }})){
    return await users.findOne({ where: { id:user_id } });
  }
  return "Something went wrong";
};
export default { getUsers, getUser, getUserByEmail, updateUser,getProfile };
