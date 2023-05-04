import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'http-status'

import responseUtil from '../../../utils/responseUtil'
import usersRepository from '../repository/usersRepository'
const getProfile = async (req: any, res: Response) => {
    try {
        const data = await usersRepository.getUserById(req.user.id)
        responseUtil.handleSuccess(OK, 'Success', data)
        return responseUtil.response(res)
    } catch (error: any) {
        responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString())
        return responseUtil.response(res)
    }
}

const  updateProfile = async (req: any, res: Response) =>{
    try {
        const data = await usersRepository.updateUser(req.user.id, req.body);
        responseUtil.handleSuccess(OK, 'Success', data);
        return responseUtil.response(res);
    } catch (error: any) {
        responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
        return responseUtil.response(res);
    }
}

const getUsers = async (req: Request, res: Response) => {
    try {
        const data = await usersRepository.getUsers()
        responseUtil.handleSuccess(OK, 'Success', data)
        return responseUtil.response(res)
    } catch (error: any) {
        responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString())
        return responseUtil.response(res)
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const data = await usersRepository.getUserById(req.params.id)
        if(!data) {
            responseUtil.handleError(NOT_FOUND, 'User not found')
            return responseUtil.response(res)
        }
        responseUtil.handleSuccess(OK, 'Success', data)
        return responseUtil.response(res)
    } catch (error: any) {
        responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString())
        return responseUtil.response(res)
    }
}
const getDrivers = async (req: Request, res: Response) => {
  try {
    const page:any = req.query.page || 1
    const limit: any = req.query.limit || 10
      const is_assigned: any = req.query.is_assigned
      const drivers = await usersRepository.getDrivers(page, limit, is_assigned);

    if (drivers.length === 0) {
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

const deleteUsers = async (req: any, res: Response) => {
    try {
      const data = await usersRepository.getUserById(req.params.id)
      if(!data) {
          responseUtil.handleError(NOT_FOUND, 'User not found')
          return responseUtil.response(res)
      }
      if((data.role === "super_admin" || data.role === "admin") && req.user.role === "admin"){
        responseUtil.handleError(NOT_FOUND, 'admin can not delete super admin or admin')
        return responseUtil.response(res)
      }
      await usersRepository.deleteUsers(req.params.id);
      responseUtil.handleSuccess(OK, "Success", {});
      return responseUtil.response(res);
    } catch (error: any) {
      responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseUtil.response(res);
    }
};

export default { updateProfile, getProfile, getUsers, getUser, getDrivers, deleteUsers }
