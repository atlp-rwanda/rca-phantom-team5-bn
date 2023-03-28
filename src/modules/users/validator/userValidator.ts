import * as Joi from "joi";
import validateSchema from "../../../utils/validateSchema";
import { Request, Response, NextFunction } from "express";

const validateUpdateUser = (  req: Request,  res: Response,  next: NextFunction) => {
  const bodySchema = Joi.object({
    fname: Joi.string(),
    lname: Joi.string(),
    driver_licence: Joi.string()
  }).options({ abortEarly: false });
  return validateSchema(bodySchema, req.body, res, next);
};

export { validateUpdateUser }