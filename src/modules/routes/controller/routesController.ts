import {Request, Response} from "express";
import { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST, UNAUTHORIZED, NOT_FOUND } from "http-status";
import responseUtil from '../../../utils/responseUtil'
import routesRepository from "../repository/routesRepository";

const createRoutes = async (req: Request, res:Response)=>{
    try {
      const data = {
        createdAt:Date.now(),
        updatedAt:Date.now(), 
        route_name: req.body.route_name,
        start: req.body.start,
        end: req.body.end,
        stops: req.body.stops
      }
      const  routes = await routesRepository.createRoutes(data)
      responseUtil.handleSuccess(OK, 'Success', routes)
      return responseUtil.response(res)
    } catch (error:any) {
        responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString())
        return responseUtil.response(res)
    }
};

const getRoute = async (req: any, res:Response)=>{
     try {
        const data = await routesRepository.getRoute(req.params.id);
        if(!data) {
          responseUtil.handleError(NOT_FOUND, 'Route not found')
          return responseUtil.response(res)
      }
      responseUtil.handleSuccess(OK, 'Success', data)
      return responseUtil.response(res)
    }catch (error: any) {
          responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString())
          return responseUtil.response(res)
      }
};

const getRoutes = async (req: Request, res: Response) => {
    try {
        const page:any = req.query.page || 1;
        const limit:any = req.query.limit || 3;
        const data = await routesRepository.getRoutes(page,limit);
        responseUtil.handleSuccess(OK, 'Success', data)
        return responseUtil.response(res);
    } catch (error: any) {
      responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseUtil.response(res);    
    }
};

const updateRoute = async (req: any, res: Response)=>{
    try {
        const data = await routesRepository.updateRoute(req.params.id, req.body);//req.route.id
        responseUtil.handleSuccess(OK, 'Success', data);
        return responseUtil.response(res);
    } catch (error: any) {
         responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
         return responseUtil.response(res);    
        }
};

const deleteRoute =async (req: any, res: Response) => {
    try {
        const data = await routesRepository.deleteRoute(req.params.id);
        responseUtil.handleSuccess(OK, 'Success', data);
        return responseUtil.response(res);
    } catch (error: any) {
        responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
        return responseUtil.response(res);
    } 
};

export default { createRoutes,getRoutes, getRoute, updateRoute, deleteRoute}