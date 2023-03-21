import {Request, Response} from "express";
import { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST, UNAUTHORIZED, NOT_FOUND } from "http-status";

import responseUtil from '../../../utils/responseUtil'
import stopsRepository from "../repository/stopsRepository";

const createStops = async (req: Request, res: Response)=> {
    try {
      const stops = await stopsRepository.createStops(req.body)
      responseUtil.handleSuccess(OK, 'Success', stops)
      return responseUtil.response(res)
    } catch (err:any) {
      responseUtil.handleError(INTERNAL_SERVER_ERROR, err.toString())
      return responseUtil.response(res)
    }
  };

  const deleStop = async (req: Request, res: Response) =>{
    try {
        const id=parseInt(req.params.id)
        const data = await stopsRepository.deleStop(id);
        responseUtil.handleSuccess(OK, 'Success', data);
        return responseUtil.response(res);
    } catch (error: any) {
        responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
        return responseUtil.response(res);
    }
};

 const getStops = async (req: Request,res: Response) => {
    try {
      const page:any = req.query.page || 1;
      const limit:any = req.query.limit || 10;
      const skip = (page - 1) * limit;
  
      const stops = await stopsRepository.getStops();
      responseUtil.handleSuccess(OK, 'Success', stops)
      return responseUtil.response(res);
    
    } catch (error: any) {
      console.log(error)
      responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseUtil.response(res);    
    }
  };


const getStop = async (req: Request, res: Response) => {
    try {
    const id=parseInt(req.params.id)
    const stop = await stopsRepository.getStop(id);

    if (!stop) {
      responseUtil.handleError(BAD_REQUEST, "Cannot find that Stop stop");
      return responseUtil.response(res);
    }

    responseUtil.handleSuccess(OK, 'Success', stop)
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
}

const  updateStop = async (req: Request, res: Response) =>{
    try {
        const id=parseInt(req.params.id)
        const stop= await stopsRepository.updateStop(id,req.body)
        responseUtil.handleSuccess(OK, 'Success', stop);
        return responseUtil.response(res);
      } catch (error:any) {
        responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
        return responseUtil.response(res);
      }
}

export default { createStops,getStops, getStop, updateStop,deleStop}


