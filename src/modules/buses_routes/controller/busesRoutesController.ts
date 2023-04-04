import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK,BAD_REQUEST,CREATED, NOT_FOUND } from 'http-status'

import responseUtil from '../../../utils/responseUtil'
import busesRepository from '../../buses/repository/busesRepository';
import routesRepository from '../../routes/repository/routesRepository';
import busesRoutesRepository from '../repository/busesRoutesRepository';

 const createBusToRoute = async (req: Request, res: Response) => {
  try {
    const areadyAssigned = await busesRoutesRepository.getAssignedBus(req.body.bus_id);
    if(!areadyAssigned) {
      responseUtil.handleError(BAD_REQUEST, 'Bus already assigned to a route')
      return responseUtil.response(res)
    }

    const bus = await busesRepository.getBusById(req.body.bus_id)
    const route = await routesRepository.getRoute(req.body.route_id)
      if(!bus || !route) {
          responseUtil.handleError(NOT_FOUND, 'Bus or Route does not exist')
          return responseUtil.response(res)
      }
      const data = await busesRoutesRepository.assignBusToRoute(req.body)
      responseUtil.handleSuccess(CREATED, 'Success', data)
      return responseUtil.response(res)
      
  } catch (err:any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, err.toString())
    return responseUtil.response(res)
  }
};

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

const updateRouteOfBus = async (req: Request, res: Response) => {
  try {
    const bus = await busesRepository.getBusById(req.body.bus_id)
    const route = await routesRepository.getRoute(req.body.route_id)
      if(!bus || !route) {
          responseUtil.handleError(NOT_FOUND, 'Bus or Route does not exist')
          return responseUtil.response(res)
      }
      
    const areadyAssigned = await busesRoutesRepository.getAssignedBus(req.body.bus_id);
    if(!areadyAssigned) {
      responseUtil.handleError(NOT_FOUND, 'Bus never been assigned to a route')
      return responseUtil.response(res)
    }
    const data = await busesRoutesRepository.updateBusRoute(req.body);
    responseUtil.handleSuccess(OK, 'Success', data)
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
};


export default { createBusToRoute, listAssignments, updateRouteOfBus }
