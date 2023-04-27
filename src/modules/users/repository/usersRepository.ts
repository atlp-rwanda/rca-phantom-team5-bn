import models from "../../../database/models/index";
import authRepository from "../../auth/repository/authRepository";
const { users } = models;

const getUsers = async () => {
  return await users.findAll({ order: [["id", "ASC"]] });
};

const getDrivers = async (page : any, limit : any, is_assigned: boolean) => {
  const offset = (page - 1) * limit;

  if (is_assigned !== undefined) 
    return await users.findAndCountAll({ where: { role: 'driver', is_assigned }, limit, offset })

  return await users.findAndCountAll({ where: { role: 'driver'}, limit, offset })
}

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

const deleteUsers = async(user_id:string)=>{
  await authRepository.deleteUserSession(user_id)
  await users.destroy({ where: {id: user_id}})
}

export default { getUsers, getDrivers, getUserById, getUserByEmail, updateUser, deleteUsers };
