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

const getBuses = async (routeId:number) => {
 
  const data = await buses_routes.findAll({where:{route_id:routeId}});
  return data;
};

export default { assignBusToRoute, getAssignments, getBuses }