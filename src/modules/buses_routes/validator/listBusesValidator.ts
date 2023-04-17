import * as Joi from "joi";
import validateSchema from "../../../utils/validateSchema";
import { Request, Response, NextFunction } from "express";

const validListBuses = (  req: Request,  res: Response,  next: NextFunction) => {
  const bodySchema = Joi.object({
    origin: Joi.string().required(),
    destination: Joi.string().required()
  }).options({ abortEarly: false });
  return validateSchema(bodySchema, req.body, res, next);
};

export { validListBuses }