import * as Joi from "joi";
import validateSchema from "../../../utils/validateSchema";
import { Request, Response, NextFunction } from "express";

const validateUpdateUser = (  req: Request,  res: Response,  next: NextFunction) => {
  const bodySchema = Joi.object({
    user_id: Joi.string().allow(null),
    name: Joi.string().min(4).max(50).required(),
    email: Joi.string().email(),
    password: Joi.string().required(),
  }).options({ abortEarly: false });
  return validateSchema(bodySchema, req.body, res, next);
};

export { validateUpdateUser }