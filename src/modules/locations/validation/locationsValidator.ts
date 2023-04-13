import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import validateSchema from "../../../utils/validateSchema";

const validLocationCreate = (  req: Request,  res: Response,  next: NextFunction) => {
  const bodySchema = Joi.object({
    location_name: Joi.string().required(),
    latitude: Joi.string().required(),
    longitude: Joi.string().required()
  }).options({ abortEarly: false });
  return validateSchema(bodySchema, req.body, res, next);
};

const ValidLocationUpdate = (  req: Request,  res: Response,  next: NextFunction) => {
  const bodySchema = Joi.object({
    location_name: Joi.string(),
  }).options({ abortEarly: false });
  return validateSchema(bodySchema, req.body, res, next);
};

export { validLocationCreate, ValidLocationUpdate }