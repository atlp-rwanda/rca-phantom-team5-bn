import models from '../../../database/models/index'
const { buses, users } = models

const getBusById = async (id: number) => {
  return await buses.findOne({ where: { id } });
};

const getBusByPlateNumber = async (plate_number: string) => {
  return await buses.findOne({ where: { plate_number } });
};

const getBuses = async (page = 1, limit = 2, route_id: number) => {

  const offset = (page - 1) * limit;
  if (route_id !== undefined) {
   const data = await buses.findAndCountAll({ where: { route_id }, limit, offset})
   return data;
  }
  
  const data = await buses.findAndCountAll({ limit, offset})
  return data
}

const deleteBus = async (id: number) => {
  await buses.destroy({where: { id:id },force: true});
}
const createBus = async (busData: any) => {
  const bus= await buses.create(busData)
  return bus;
}
const updateBus = async (busId: number, busData: any) => {
  await buses.update( busData, {
    where:{ id : busId }
  })

  return await getBusById(busId);
}

const getUserByIdAndRole = async (id: number, role: string) => {
    const driver = await users.findOne({ where: { id, role } });
    return driver
}
const assignBus = async (body: any) => {
  const bus = await buses.getBusById(body.bus_id)

   await buses.update({ driver_id: body.driver_id }, { where: { id: body.bus_id } });
   await users.update({ is_assigned: true }, { where: { id: body.driver_id } });

   return bus

 }

export default { getBusById, getBusByPlateNumber, getBuses, deleteBus, createBus,updateBus, assignBus, getUserByIdAndRole }