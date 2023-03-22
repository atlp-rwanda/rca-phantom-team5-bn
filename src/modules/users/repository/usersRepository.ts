import models from "../../../database/models/index";
const { users } = models;

const getUsers = async () => {
  return await users.findAll({ order: [["id", "ASC"]] });
};

const getUser = async (id: string) => {
  return await users.findOne({ where: { id } });
};

const getUserByEmail = async (email: string) => {
  return await users.findOne({ where: { email } });
};

const comparePassword = async (password: string) => {
  return await users.findOne({ where: { password } });
};

export default { getUsers, getUser, getUserByEmail, comparePassword };
