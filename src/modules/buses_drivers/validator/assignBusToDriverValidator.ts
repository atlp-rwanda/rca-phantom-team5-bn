import * as Joi from "joi";
import validateSchema from "../../../utils/validateSchema";
import { Request, Response, NextFunction } from "express";

const validateAssignBusToDriver = (  req: Request,  res: Response,  next: NextFunction) => {
    const bodySchema = Joi.object({
    driverId: Joi.number().required()
    }).options({ abortEarly: false });
    return validateSchema(bodySchema, req.body, res, next);
  };


export { validateAssignBusToDriver }