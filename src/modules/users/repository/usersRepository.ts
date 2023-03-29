import models from "../../../database/models/index";
const { users } = models;

const getUsers = async () => {
  return await users.findAll({ order: [["id", "ASC"]] });
};
const getUserById = async (id: string) => {
  return await users.findOne({ where: { id } });
};

const getUserByEmail = async (email: string) => {
  return await users.findOne({ where: { email } });
};

const updateUser = async (user_id: number, data: any) => {
  await users.update(data, { where: { id: user_id }})
    return await users.findOne({ where: { id:user_id } });
};
export default { getUsers, getUserById, getUserByEmail, updateUser };
