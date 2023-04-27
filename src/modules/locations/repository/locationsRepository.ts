import models from '../../../database/models/index'
const { locations } = models

const createLocation = async (data: any) => {
  return await locations.create(data);
}

const getLocations = async (page:any, limit: any) => {
if(page != undefined && limit != undefined){
  const offset = (page - 1) * limit;  
  return  await locations.findAndCountAll({ limit, offset})
}
  return await locations.findAll();
}

const getLocationById = async (id: number) => {
  return await locations.findOne({ where: { id } });
};

const updateLocation = async (locationId: number, locationData: any) => {
  await locations.update( locationData, {
    where:{ id : locationId }
  })

  return await getLocationById(locationId);
}

const deleteLocation = async (id: number) => {
  await locations.destroy({where: { id:id }});
}

export default { createLocation, getLocations, getLocationById, updateLocation, deleteLocation }