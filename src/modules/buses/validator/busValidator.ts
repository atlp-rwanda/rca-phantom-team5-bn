import * as Joi from "joi";
import validateSchema from "../../../utils/validateSchema";
import { Request, Response, NextFunction } from "express";

const validateCreateBus = (  req: Request,  res: Response,  next: NextFunction) => {
  const bodySchema = Joi.object({
    plate_number: Joi.string().required(),
    name: Joi.string().required(),
    model: Joi.string().required(),
    available_sits: Joi.number().required(),
    driverId: Joi.number()
  }).options({ abortEarly: false });
  return validateSchema(bodySchema, req.body, res, next);
};

const validateUpdateBus = (  req: Request,  res: Response,  next: NextFunction) => {
    const bodySchema = Joi.object({
      route_id: Joi.number(),
      plate_number: Joi.string(),
      name: Joi.string(),
      model: Joi.string(),
      available_sits: Joi.number(),
      driverId: Joi.number()
    }).options({ abortEarly: false });
    return validateSchema(bodySchema, req.body, res, next);
  };


export { validateCreateBus, validateUpdateBus }