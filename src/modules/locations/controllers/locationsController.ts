import { Request, Response } from "express"

import responseUtil from '../../../utils/responseUtil'
import locationsRepository from '../repository/locationsRepository';
import { CONFLICT, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "http-status";

const createLocation = async (req: Request, res: Response) => {
  try {
    const data = await locationsRepository.createLocation(req.body)
    responseUtil.handleSuccess(CREATED, 'Success', data)
    return responseUtil.response(res)

  } catch (err:any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, err.toString())
    return responseUtil.response(res)
  }
}

export const getLocations = async (req: Request,res: Response) => {
  try { 
    const page:any = req.query.page || 1
    const limit:any = req.query.limit || 2;
    const data = await locationsRepository.getLocations(page, limit);
    responseUtil.handleSuccess(OK, 'Success', data)
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);    
  }
};

export const getLocation = async (req: any, res: Response) => {
  try {
    const data = await locationsRepository.getLocationById(req.params.id);

    if (!data) {
      responseUtil.handleError(NOT_FOUND, "Location with that ID  doesn't exist");
      return responseUtil.response(res);
    }

    responseUtil.handleSuccess(OK, 'Success', data)
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
}

export const updatelocation = async (req:any, res:Response) => {
  try {
    const location = await locationsRepository.getLocationById(req.params.id);
    if (!location) {
      responseUtil.handleError(NOT_FOUND, "Location with that ID  doesn't exist");
      return responseUtil.response(res);
    }

    const data = await locationsRepository.updatLocation(req.params.id, req.body)
    responseUtil.handleSuccess(OK, 'Success', data);
    return responseUtil.response(res);
  } catch (error:any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
}

export const deleteLocation = async (req: any, res: Response) => {
    try {
      const location = await locationsRepository.getLocationById(req.params.id);
      if (!location) {
        responseUtil.handleError(NOT_FOUND, "Location with that ID  doesn't exist");
        return responseUtil.response(res);
      }

      const data = await locationsRepository.deleteLocation(req.params.id);
      responseUtil.handleSuccess(OK, 'Success', data);
      return responseUtil.response(res);
    } catch (error: any) {
      responseUtil.handleError(NOT_FOUND, error.toString());
      return responseUtil.response(res);
    }
}

export default { createLocation, getLocation, getLocations, updatelocation, deleteLocation }