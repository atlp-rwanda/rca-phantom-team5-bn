import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import validateSchema from "../../../utils/validateSchema";

const validRegisterUser = (  req: Request,  res: Response,  next: NextFunction) => {
  const bodySchema = Joi.object({
    email: Joi.string().email().required(),
    role: Joi.string().required().valid('driver', 'operator'),
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    driver_licence: Joi.array().min(1).max(6).items(Joi.valid('A','B','C','C','D','E','F')),
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

const validResetPassword = (  req: Request,  res: Response,  next: NextFunction) => {
  const bodySchema = Joi.object({
    password: Joi.string().required(),
    confirm_password: Joi.string(),
  }).options({ abortEarly: false });
  return validateSchema(bodySchema, req.body, res, next);
};

export { validRegisterUser, validSignIn, validResetPassword }