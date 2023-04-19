import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import validateSchema from "../../../utils/validateSchema";

const validLocation= (  req: Request,  res: Response,  next: NextFunction) => {
  const bodySchema = Joi.object({
    location_name: Joi.string().required(),
    latitude: Joi.string().required(),
    longitude: Joi.string().required()
  }).options({ abortEarly: false });
  return validateSchema(bodySchema, req.body, res, next);
};

export { validLocation }