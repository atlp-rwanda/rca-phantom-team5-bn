import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK,BAD_REQUEST,CREATED } from 'http-status'

import responseUtil from '../../../utils/responseUtil'
import busesRepository from '../repository/busesRepository';

 const createBus = async (req: Request, res: Response)=> {
  try {
    const data = await busesRepository.createBus(req.body)
    responseUtil.handleSuccess(CREATED, 'Success', data)
    return responseUtil.response(res)
  } catch (err:any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, err.toString())
    return responseUtil.response(res)
  }
};
export const getBuses = async (req: Request,res: Response) => {
  try {
    const page:any = req.query.page || 1
    const limit:any = req.query.limit || 2;
   const data = await busesRepository.getBuses(page,limit);
    responseUtil.handleSuccess(OK, 'Success', data)
    return responseUtil.response(res);
  } catch (error: any) {
    console.log(error)
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);    
  }
};
export const getBus = async (req: Request, res: Response) => {
  try {
    const id=parseInt(req.params.id)
    const data = await busesRepository.getABus(id);

    if (!data) {
      responseUtil.handleError(BAD_REQUEST, "Bus with that ID  doesn't exist");
      return responseUtil.response(res);
    }

    responseUtil.handleSuccess(OK, 'Success', data)
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
};
export const updateBus=async(req:Request,res:Response)=>{
  try {
    const id=parseInt(req.params.id)
    const data= await busesRepository.updateBus(id,req.body)
    if (!data) {
      responseUtil.handleError(BAD_REQUEST, "Bus with that ID  doesn't exist");
      return responseUtil.response(res);
    }
    responseUtil.handleSuccess(OK, 'Success', data);
    return responseUtil.response(res);
  } catch (error:any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
}
export const deleteBus = async (req: Request, res: Response) =>{
    try {
        const id=parseInt(req.params.id)
        const data = await busesRepository.deleteBus(id);
        responseUtil.handleSuccess(OK, 'Success', data);
        return responseUtil.response(res);
    } catch (error: any) {
        responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
        return responseUtil.response(res);
    }
}

export default { createBus, getBuses, getBus, updateBus, deleteBus }
