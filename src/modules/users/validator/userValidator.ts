import * as Joi from "joi";
import validateSchema from "../../../utils/validateSchema";
import { Request, Response, NextFunction } from "express";

const validateUpdateUser = (  req: Request,  res: Response,  next: NextFunction) => {
  const bodySchema = Joi.object({
    fname: Joi.string().min(3),
    lname: Joi.string().min(3),
    driver_licence: Joi.array().min(1).max(6).items(Joi.valid('A','B','C','C','D','E','F')),
  }).options({ abortEarly: false });
  return validateSchema(bodySchema, req.body, res, next);
};

export { validateUpdateUser }