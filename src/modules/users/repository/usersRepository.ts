import models from "../../../database/models/index";
const { users } = models;

const getUsers = async () => {
  const data = await users.findAll({ order: [["id", "ASC"]] });
  return data;
};

const getUser = async (id: string) => {
  const data = await users.findOne({ where: { id } });
  return data;
};

const updateUser = async (id: string, data: object) => {
  await users.update(data, {
    where: { id: id },
  });
  return getUser(id);
};

export default { getUsers, getUser, updateUser };
