import { Request, Response } from 'express';
import agenciesRepository from '../repository/agenciesRepository';

 import { INTERNAL_SERVER_ERROR, OK,BAD_REQUEST } from 'http-status'
 import responseUtil from '../../../utils/responseUtil'

 const createAgency = async (req: Request, res: Response)=> {
  try {
    const data = await agenciesRepository.createAgency(req.body)
    responseUtil.handleSuccess(OK, 'Success', data)
    return responseUtil.response(res)
  } catch (err:any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, err.toString())
    return responseUtil.response(res)
  }
};

export const deleteAgency = async (req: Request, res: Response) =>{
    try {
        const id=parseInt(req.params.id)
        const data = await agenciesRepository.deleteAgency(id);
        responseUtil.handleSuccess(OK, 'Success', data);
        return responseUtil.response(res);
    } catch (error: any) {
        responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
        return responseUtil.response(res);
    }
}

export const findAgency = async (req: Request, res: Response) => {
  try {
    const id=parseInt(req.params.id)
    const data = await agenciesRepository.getAgency(id);

    if (!data) {
      responseUtil.handleError(BAD_REQUEST, "Agency with that ID  doesn't exist");
      return responseUtil.response(res);
    }

    responseUtil.handleSuccess(OK, 'Success', data)
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
};




export const findAllAgencies = async (req: Request,res: Response) => {
  try {
   const data = await agenciesRepository.getAgencies();
    responseUtil.handleSuccess(OK, 'Success', data)
    return responseUtil.response(res);
  
  } catch (error: any) {
    console.log(error)
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);    
  }
};


export const updateAgency=async(req:Request,res:Response)=>{
  try {
    const id=parseInt(req.params.id)
    const data= await agenciesRepository.updateAgency(id,req.body)
    if (!data) {
      responseUtil.handleError(BAD_REQUEST, "Agency with that ID  doesn't exist");
      return responseUtil.response(res);
    }
    responseUtil.handleSuccess(OK, 'Success', data);
    return responseUtil.response(res);
  } catch (error:any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
}

export default{findAllAgencies,findAgency,createAgency,deleteAgency,updateAgency}
