import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK,BAD_REQUEST,CREATED } from 'http-status'

import responseUtil from '../../../utils/responseUtil'
import busesRepository from '../../buses/repository/busesRepository';
import routesRepository from '../../routes/repository/routesRepository';
import busesRoutesRepository from '../repository/busesRoutesRepository';

 const createBusToRoute = async (req: Request, res: Response) => {
  
  try {
    const bus = await busesRepository.getBusById(req.body.bus_id)
    const route = await routesRepository.getRoute(req.body.route_id)
    if(!bus || !route) {
        responseUtil.handleError(BAD_REQUEST, 'Bus or Route does not exist')
        return responseUtil.response(res)
    }
    const data = await busesRoutesRepository.assignBusToRoute(req.body)
    responseUtil.handleSuccess(CREATED, 'Success', data)
    return responseUtil.response(res)

  } catch (err:any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, err.toString())
    return responseUtil.response(res)
  }
}

const listAssignments = async (req: Request, res: Response) => {
  try {
      const page:any = req.query.page || 1;
      const limit:any = req.query.limit || 3;
      const data = await busesRoutesRepository.getAssignments(page,limit);
      responseUtil.handleSuccess(OK, 'Success', data)
      return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);    
  }
};
const listBusesInRoute = async (req: Request, res: Response) => {
  try {
      const {orgin,destination} = req.body
      const route = await routesRepository.getRouteByOrginAndDestination(orgin,destination)
      if(!route){
        responseUtil.handleError(BAD_REQUEST, 'Route does not exist')
        return responseUtil.response(res)
      }
      const busesInRoute = await busesRoutesRepository.getBuses(route.id);
      if(!busesInRoute || busesInRoute.length < 1){
        const data = await busesRoutesRepository.getAssignments(1,3)
        responseUtil.handleSuccess(OK, 'No buses in this routes', data)
        return responseUtil.response(res)
      }
      const buses = busesInRoute.map(async (bus: any) => {
        return await busesRepository.getBusById(bus.bus_id)
      })
      responseUtil.handleSuccess(OK, 'Success', buses)
      return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);    
  }
};

export default { createBusToRoute, listAssignments, listBusesInRoute }
