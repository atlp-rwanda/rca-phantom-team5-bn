import * as Joi from "joi";
import validateSchema from "../../../utils/validateSchema";
import { Request, Response, NextFunction } from "express";

const validateCreateRoute = (  req: Request,  res: Response,  next: NextFunction) => {
  const bodySchema = Joi.object({
    route_name: Joi.string().required(),
    start: Joi.string().required(),
    end: Joi.string().required(),
    stops: Joi.array().min(1).items(Joi.number()).required(),
    way_points: Joi.array().min(1).items(Joi.number()).required(),
  }).options({ abortEarly: false });
  return validateSchema(bodySchema, req.body, res, next);
};

const validateUpdateRoute = (  req: Request,  res: Response,  next: NextFunction) => {
    const bodySchema = Joi.object({
        route_name: Joi.string(),
        start: Joi.string(),
        end: Joi.string(),
        stops: Joi.array().min(1).items(Joi.number()),
        way_points: Joi.array().min(1).items(Joi.number()),
    }).options({ abortEarly: false });
    return validateSchema(bodySchema, req.body, res, next);
  };

export { validateCreateRoute, validateUpdateRoute}