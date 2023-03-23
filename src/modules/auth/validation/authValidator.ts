import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import validateSchema from "../../../utils/validateSchema";

const validRegisterUser = (  req: Request,  res: Response,  next: NextFunction) => {
  const bodySchema = Joi.object({
    email: Joi.string().email().required(),
    role: Joi.string().required().valid('driver', 'operator'),
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    driver_licence: Joi.string().length(1).uppercase(),
    nid: Joi.string().length(16).required(),   
  }).options({ abortEarly: false });
  return validateSchema(bodySchema, req.body, res, next);
};

const validSignIn = (  req: Request,  res: Response,  next: NextFunction) => {
  const bodySchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    device_id: Joi.string().required(),
  }).options({ abortEarly: false });
  return validateSchema(bodySchema, req.body, res, next);
};


export { validRegisterUser, validSignIn }