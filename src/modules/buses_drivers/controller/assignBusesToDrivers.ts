import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK, BAD_REQUEST, CREATED } from 'http-status'

import responseUtil from '../../../utils/responseUtil'
import assignBusesToDrivers from '../repository/assignBusesToDrivers'
const findUsersWithDriverRole = async (req: Request, res: Response) => {
  try {
    const page:any = req.query.page || 1
    const limit: any = req.query.limit || 10
    const is_assigned: any = req.query.is_assigned
    const drivers = await assignBusesToDrivers.findUsersWithDriverRole(page,limit,is_assigned);
    if (!drivers) {
      responseUtil.handleError(NOT_FOUND, "No drivers exist");
      return responseUtil.response(res);
      }

    responseUtil.handleSuccess(OK, 'Success', drivers)
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
}
const assignDriverToBus = async (req: any, res: Response) => {
  try {
      const {driverId } = req.body;
    
    const bus = await assignBusesToDrivers.setDriver(driverId, req.params.id);
    if (!bus) {
       responseUtil.handleError(NOT_FOUND, "There is no bus to update");
      return responseUtil.response(res);
    }

    const driver = await assignBusesToDrivers.getUserByIdAndRole(driverId, 'driver');
    if (!driver) {
       responseUtil.handleError(NOT_FOUND, "Driver doesn't exist");
       return responseUtil.response(res);
    }
     responseUtil.handleSuccess(OK, 'Success', bus)
     return responseUtil.response(res);
  } catch (err:any) {
     responseUtil.handleError(INTERNAL_SERVER_ERROR, err.toString());
    return responseUtil.response(res);
  }
}



export default { findUsersWithDriverRole, assignDriverToBus }