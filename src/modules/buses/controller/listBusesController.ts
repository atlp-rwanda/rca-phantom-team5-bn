import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK,BAD_REQUEST,CREATED,NOT_FOUND, CONFLICT } from 'http-status'

import responseUtil from '../../../utils/responseUtil'
import listBusesRepository from '../repository/listBusesRepository';

export const getRouteBuses = async (req: Request,res: Response) => {
  try {
    const page:any = req.query.page || 1
    const limit:any = req.query.limit || 2;
//    const data = await busesRepository.getBuses(page,limit);
    // responseUtil.handleSuccess(OK, 'Success', data)
    return responseUtil.response(res);
  } catch (error: any) {
    console.log(error)
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);    
  }
};


export default { getRouteBuses }
