import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK,CREATED,NOT_FOUND, CONFLICT } from 'http-status'

import responseUtil from '../../../utils/responseUtil'
import busesRepository from '../repository/busesRepository';
import usersRepository from '../../users/repository/usersRepository';
const createBus = async (req: Request, res: Response) => {
  try {
    const bus = await busesRepository.getBusByPlateNumber(req.body.plate_number)
    if (bus) {
      responseUtil.handleError(CONFLICT, 'Plate number already used')
      return responseUtil.response(res)
    }
    const data = await busesRepository.createBus(req.body)
    responseUtil.handleSuccess(CREATED, 'Success', data)
    return responseUtil.response(res)

  } catch (err: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, err.toString())
    return responseUtil.response(res)
  }
}

const getBuses = async (req: Request, res: Response) => {
  try {
    const page: any = req.query.page;
    const limit: any = req.query.limit;
    const router_id: any = req.query.router_id;
    const data = await busesRepository.getBuses(page, limit, router_id);
    responseUtil.handleSuccess(OK, 'Success', data)
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
};

const getBus = async (req: any, res: Response) => {
  try {
    const data = await busesRepository.getBusById(req.params.id);

    if (!data) {
      responseUtil.handleError(NOT_FOUND, "Bus with that ID  doesn't exist");
      return responseUtil.response(res);
    }

    responseUtil.handleSuccess(OK, 'Success', data)
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
}

const updateBus = async (req: any, res: Response) => {
  try {
    const bus = await busesRepository.getBusById(req.params.id);
    if (!bus) {
      responseUtil.handleError(NOT_FOUND, "Bus with that ID  doesn't exist");
      return responseUtil.response(res);
    }

    const data = await busesRepository.updateBus(req.params.id, req.body)
    responseUtil.handleSuccess(OK, 'Success', data);
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
}
const deleteBus = async (req: any, res: Response) => {
  try {
    const bus = await busesRepository.getBusById(req.params.id);
    if (!bus) {
      responseUtil.handleError(NOT_FOUND, "Bus with that ID  doesn't exist");
      return responseUtil.response(res);
    }

    const data = await busesRepository.deleteBus(req.params.id);
    responseUtil.handleSuccess(OK, 'Success', data);
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
}
const assignBus = async (req: any, res: Response) => {
  try {
    const bus = await busesRepository.getBusById(req.body.bus_id);
    if (!bus) {
      responseUtil.handleError(NOT_FOUND, "Bus not found");
      return responseUtil.response(res);
    }
    if (bus.driver_id !== null) {
      responseUtil.handleError(CONFLICT, "Bus already assigned");
      return responseUtil.response(res);
    }
    const user = await usersRepository.getUserById(req.body.driver_id);
    if (!user) {
      responseUtil.handleError(NOT_FOUND, "User not found");
      return responseUtil.response(res);
    }
    if (user.is_assigned === true) {
      responseUtil.handleError(CONFLICT, "Driver already assigned  to a bus");
      return responseUtil.response(res);
    }

    const data = await busesRepository.assignBus(req.body);
    responseUtil.handleSuccess(OK, 'Success', data)
    return responseUtil.response(res);
  } catch (err: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, err.toString());
    return responseUtil.response(res);
  }
}

const getBusesByRoute = async (req: any, res: Response) => {
  try {
    const orgin: any = req.params.orgin;
    const destination: any = req.params.destination;
    const buses = await busesRepository.getBusesByRoutes(orgin, destination)
    if (buses.length < 1) {
      responseUtil.handleError(NOT_FOUND, "Bus not found");
      return responseUtil.response(res);
    }
    responseUtil.handleSuccess(OK, 'Success', buses)
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
}

const getBusesByDriver = async (req: any, res: Response) => {
  try {
    const driver_id: any = req.params.driver_id;
    const bus = await busesRepository.getBusesByDriverId(driver_id)
    if (!bus) {
      responseUtil.handleError(NOT_FOUND, "Bus not found");
      return responseUtil.response(res);
    }
    responseUtil.handleSuccess(OK, 'Success', bus)
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }

}

export default { createBus, getBuses, getBus, updateBus, deleteBus, assignBus, getBusesByRoute, getBusesByDriver }
