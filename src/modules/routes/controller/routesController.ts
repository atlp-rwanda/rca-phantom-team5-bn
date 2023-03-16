import { Request, Response } from 'express'
import responseUtil from '../../../utils/responseUtil'
import { INTERNAL_SERVER_ERROR, OK } from 'http-status'

const getRoutes = async (req: Request, res: Response) => {
    try {
        const data: any = ['routes']
        responseUtil.handleSuccess(OK, 'Success', data)
        return responseUtil.response(res)
    } catch (error: any) {
        responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString())
        return responseUtil.response(res)
    }
}


const getRoute = async (req: Request, res: Response) => {
    try {
        const data: any = ['route']
        responseUtil.handleSuccess(OK, 'Success', data)
        return responseUtil.response(res)
    } catch (error: any) {
        responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString())
        return responseUtil.response(res)
    }
}

export default { getRoutes, getRoute }