import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK,BAD_REQUEST,CREATED,NOT_FOUND, CONFLICT } from 'http-status'

import responseUtil from '../../../utils/responseUtil'
import busesRepository from '../repository/busesRepository';

 const createBus = async (req: Request, res: Response) => {
  try {
    const bus = await busesRepository.getBusByPlateNumber(req.body.plate_number)
    if(bus) {
        responseUtil.handleError(CONFLICT, 'Plate number already used')
        return responseUtil.response(res)
    }
    const data = await busesRepository.createBus(req.body)
    responseUtil.handleSuccess(CREATED, 'Success', data)
    return responseUtil.response(res)

  } catch (err:any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, err.toString())
    return responseUtil.response(res)
  }
}

export const getBuses = async (req: Request,res: Response) => {
  try { 
    const page:any = req.query.page || 1
    const limit:any = req.query.limit || 2;
    const route_id: any = req.query.route_id;
    const data = await busesRepository.getBuses(page, limit, route_id);
    responseUtil.handleSuccess(OK, 'Success', data)
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);    
  }
};

export const getBus = async (req: any, res: Response) => {
  try {
    const data = await busesRepository.getBusById(req.params.id);

    if (!data) {
      responseUtil.handleError(NOT_FOUND, "Bus with that ID  doesn't exist");
      return responseUtil.response(res);
    }

    responseUtil.handleSuccess(OK, 'Success', data)
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
}

export const updateBus = async (req:any, res:Response) => {
  try {
    const bus = await busesRepository.getBusById(req.params.id);
    if (!bus) {
      responseUtil.handleError(NOT_FOUND, "Bus with that ID  doesn't exist");
      return responseUtil.response(res);
    }

    const data = await busesRepository.updateBus(req.params.id, req.body)
    responseUtil.handleSuccess(OK, 'Success', data);
    return responseUtil.response(res);
  } catch (error:any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
}

export const deleteBus = async (req: any, res: Response) => {
    try {
      const bus = await busesRepository.getBusById(req.params.id);
      if (!bus) {
        responseUtil.handleError(NOT_FOUND, "Bus with that ID  doesn't exist");
        return responseUtil.response(res);
      }

      const data = await busesRepository.deleteBus(req.params.id);
      responseUtil.handleSuccess(OK, 'Success', data);
      return responseUtil.response(res);
    } catch (error: any) {
      responseUtil.handleError(NOT_FOUND, error.toString());
      return responseUtil.response(res);
    }
}

export default { createBus, getBuses, getBus, updateBus, deleteBus }
