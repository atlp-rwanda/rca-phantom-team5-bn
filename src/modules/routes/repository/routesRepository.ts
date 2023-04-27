import models from "../../../database/models/index";
const { routes } = models;

const createRoutes = async (data: any) => {
  const route = await routes.create(data);
  return route;
};

const getRoutes = async (page: any, limit: any) => {
  const offset = (page - 1) * limit;
  const data = await routes.findAndCountAll({ limit, offset });
  return data;
};

const getRoute = async (id: number) => {
  const data = await routes.findOne({ where: { id } });
  return data;
};

const getRouteByOrginDestinaton = async (origin: number, destination: number) => {
  const data = await routes.findOne({ where: { start: origin, end: destination, } })
  return data
};

const updateRoute = async (route_id: number, data: any) => {
  await routes.update(data, { where: { id: route_id } });
  return await routes.findOne({ where: { id: route_id } });
};

const deleteRoute = async (id: number) => {
  const result = await routes.destroy({ where: { id: id }, force: true });
  if (result) {
    const route = await routes.findOne({ where: { id } });
    return route;
  } else {
    throw new Error("Route not found");
  }
};


export default { createRoutes, getRoutes, getRoute, getRouteByOrginDestinaton, updateRoute, deleteRoute };
