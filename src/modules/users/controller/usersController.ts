import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR,FORBIDDEN, OK } from 'http-status'

import responseUtil from '../../../utils/responseUtil'
import usersRepository from '../repository/usersRepository'
import client from '../../../utils/connectRedisUtils'

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
        const data = await usersRepository.getUser(req.params.id)
        responseUtil.handleSuccess(OK, 'Success', data)
        return responseUtil.response(res)
    } catch (error: any) {
        responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString())
        return responseUtil.response(res)
    }
}

const logout = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('bearer ')) {
        return  responseUtil.handleError(FORBIDDEN,'Invalid authorization header');
    }

    const token = authHeader.slice('bearer'.length).trim();

    client.set(token, 'revoked');
   return responseUtil.handleSuccess(OK, 'Logout successful',{});
}

    export default { getUsers, getUser, logout }