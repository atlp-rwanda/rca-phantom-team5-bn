import models from '../../../database/models/index'
const { buses } = models

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

export default { getBusById, getBusByPlateNumber, getBuses, deleteBus, createBus,updateBus}