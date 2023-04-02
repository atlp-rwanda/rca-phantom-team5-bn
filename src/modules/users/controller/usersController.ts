import { NOTFOUND } from 'dns';
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

const getUserById = async (req: Request, res: Response) => {
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

export default { updateProfile, getProfile, getUsers, getUserById }
