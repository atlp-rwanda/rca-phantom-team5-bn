import models from '../../../database/models/index'
const { locations } = models

const createLocation = async (data: any) => {
  return await locations.create(data);
}

const getLocations = async (page = 1, limit = 2) => {

  const offset = (page - 1) * limit;  
  return  await locations.findAndCountAll({ limit, offset})
}

const getLocationById = async (id: number) => {
  return await locations.findOne({ where: { id } });
};

const updatLocation = async (busId: number, busData: any) => {
  await locations.update( busData, {
    where:{ id : busId }
  })

  return await getLocationById(busId);
}

const deleteLocation = async (id: number) => {
  await locations.destroy({where: { id:id },force: true});
}

export default { createLocation, getLocations, getLocationById, updatLocation, deleteLocation }