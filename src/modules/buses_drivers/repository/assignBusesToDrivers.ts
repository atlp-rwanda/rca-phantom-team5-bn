import models from "../../../database/models/index";
const { users } = models;
const { buses } = models
import busesRepository from "../../buses/repository/busesRepository";
import usersRepository from "../../users/repository/usersRepository";

const findUsersWithDriverRole = async (page = 1, limit = 3, is_assigned: boolean) => {
  const offset = (page - 1) * limit;
  if (is_assigned !== undefined) {
  const drivers = await users.findAndCountAll({ where: { role: 'driver',is_assigned }, limit, offset })
  return drivers;
  }
   const drivers = await users.findAndCountAll({ where: { role: 'driver'}, limit, offset })
  return drivers;
 
}

const setDriver = async (driverId: string, busId: number) => {
  const bus = await busesRepository.getBusById(busId)
  const driver = await usersRepository.getUserById(driverId)

  if (!bus) {
    return null;
  }

  if (!driver) {
    return null;
  }

   await buses.update({ driverId: driverId }, { where: { id: busId } });
  await users.update({ is_assigned: true }, { where: { id: driverId } });

   return bus

 }

const getUserByIdAndRole = async (id: number, role: string) => {
    const driver = await users.findOne({ where: { id, role } });
    return driver
}

export default { findUsersWithDriverRole, setDriver, getUserByIdAndRole }