import models from '../../../database/models/index'
const { buses_routes } = models


const assignBusToRoute = async (data: any) => {
  const assignment= await buses_routes.create(data);
  return assignment;
};

const getAssignments = async (page = 1, limit = 2) => {
  const offset = (page - 1) * limit;
  const data = await buses_routes.findAndCountAll({ limit, offset });
  return data;
};

const getAssignedBus = async (bus_id: any) => {
  const data = await buses_routes.findOne({ where: { bus_id } });
  return data;
};

const updateBusRoute = async (data: any) => {
  const { bus_id, route_id } = data;
   await buses_routes.update({ route_id }, { where: { bus_id } });
  return await getAssignedBus(bus_id);
};

export default { assignBusToRoute, getAssignments, getAssignedBus, updateBusRoute }