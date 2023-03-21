import { Request, Response } from 'express';
 import busesRepository from '../repository/busesRepository';

 import { INTERNAL_SERVER_ERROR, OK,BAD_REQUEST } from 'http-status'
 import responseUtil from '../../../utils/responseUtil'

 const createBus = async (req: Request, res: Response)=> {
  try {
    const bus = await busesRepository.createBus(req.body)
    responseUtil.handleSuccess(OK, 'Success', bus)
    return responseUtil.response(res)
  } catch (err:any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, err.toString())
    return responseUtil.response(res)
  }
};

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

export const findBus = async (req: Request, res: Response) => {
  try {
    const id=parseInt(req.params.id)
    const bus = await busesRepository.getABus(id);

    if (!bus) {
      responseUtil.handleError(BAD_REQUEST, "Bus with that ID  doesn't exist");
      return responseUtil.response(res);
    }

    responseUtil.handleSuccess(OK, 'Success', bus)
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
};




export const findAllBuses = async (req: Request,res: Response) => {
  try {
    const page:any = req.query.page || 1;
    const limit:any = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const buses = await busesRepository.getBuses();
    responseUtil.handleSuccess(OK, 'Success', buses)
    return responseUtil.response(res);
  
  } catch (error: any) {
    console.log(error)
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);    
  }
};


export const updateBus=async(req:Request,res:Response)=>{
  try {
    const id=parseInt(req.params.id)
    const bus= await busesRepository.updateBus(id,req.body)
    responseUtil.handleSuccess(OK, 'Success', bus);
    return responseUtil.response(res);
  } catch (error:any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
}

export default{findAllBuses,findBus,createBus,deleteBus,updateBus}
