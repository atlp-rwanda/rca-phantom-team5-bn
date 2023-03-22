import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import validateSchema from "../../../utils/validateSchema";

const validSignIn = (  req: Request,  res: Response,  next: NextFunction) => {
  const bodySchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    device_id: Joi.string().required(),
  }).options({ abortEarly: false });
  return validateSchema(bodySchema, req.body, res, next);
};

export { validSignIn }