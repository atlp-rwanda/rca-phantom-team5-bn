import models from '../../../database/models/index'
const { buses, users, routes, locations } = models

const getBusById = async (id: number) => {
  return await buses.findOne({ where: { id } });
};

const getBusByPlateNumber = async (plate_number: string) => {
  return await buses.findOne({ where: { plate_number } });
};

const getBusesByDriverId = async (driver_id: number) => {
  return await buses.findOne({
    where: { driver_id },
    include: [
      {
        model: routes ,
        as: 'routes',
        attributes: ['id', 'route_name'],
        include: [{
          model: locations,
          as: 'locations_start',
          attributes: ['id','location_name','latitude','longitude'],
        }, {
          model: locations,
          as: 'locations_end', 
          attributes: ['id','location_name','latitude','longitude'],
        }],
      },
    ],
  });
};

const getBuses = async (page = 1, limit = 2, route_id: number) => {
  const offset = (page - 1) * limit;
  if (route_id !== undefined) {
   return await buses.findAndCountAll({ where: { route_id }, limit, offset})
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

const assignBus = async (body: any) => {
  await buses.update({ driver_id: body.driver_id }, { where: { id: body.bus_id } });
  await users.update({ is_assigned: true }, { where: { id: body.driver_id } });
  
   return await getBusById(body.bus_id)
}

const getBusesByRoutes = async (orgin:number, destination:number) => {
  const busesInRoute = await buses.findAll({
    include: {
      model: routes,
      as: 'routes',
      where: {
        start:orgin,
        end:destination,
      },
      include: [{
        model: locations,
        as: 'locations_start',
      }, {
        model: locations,
        as: 'locations_end', 
      }],
    },
  });

  return busesInRoute;
}


export default { getBusById, getBusByPlateNumber, getBusesByDriverId, getBuses, deleteBus, createBus, updateBus, assignBus, getBusesByRoutes }
