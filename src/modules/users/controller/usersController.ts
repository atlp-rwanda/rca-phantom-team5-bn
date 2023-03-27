import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR, OK, NOT_FOUND } from 'http-status'

import responseUtil from '../../../utils/responseUtil'
import usersRepository from '../repository/usersRepository'

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
        const access_token = req.headers.authorization?.split(" ")[1] as string;
        const data = await usersRepository.getUser(access_token)
        responseUtil.handleSuccess(OK, 'Success', data)
        return responseUtil.response(res)
    } catch (error: any) {
        responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString())
        return responseUtil.response(res)
    }
}

const  updateProfile = async (req: Request, res: Response) =>{
    try {
        const user = await usersRepository.getUser(req.params.id);
        if (!user) {
            responseUtil.handleError(NOT_FOUND, 'User not found');
            return responseUtil.response(res);
        }
        const data = await usersRepository.updateUser(req.params.id, req.body);
        responseUtil.handleSuccess(OK, 'Success', data);
        return responseUtil.response(res);
    } catch (error: any) {
        responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
        return responseUtil.response(res);
    }
}

export default { getUsers, getUser, updateProfile }