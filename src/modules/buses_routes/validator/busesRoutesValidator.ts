import * as Joi from "joi";
import validateSchema from "../../../utils/validateSchema";
import { Request, Response, NextFunction } from "express";

const validBusesRoutes = (  req: Request,  res: Response,  next: NextFunction) => {
  const bodySchema = Joi.object({
    bus_id: Joi.number().required(),
    route_id: Joi.number().required()
  }).options({ abortEarly: false });
  return validateSchema(bodySchema, req.body, res, next);
};

export { validBusesRoutes }