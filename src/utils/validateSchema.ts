import { BAD_REQUEST } from "http-status";
import responseUtil from "./responseUtil";
import { Request, Response, NextFunction } from "express";

const validateSchema = (schema: any, body:object, res: Response, next: NextFunction) => {
  const { error } = schema.validate(body);
  if (error) {
    const errors = error.details.map((err: any) => err.message);
    responseUtil.handleError(BAD_REQUEST, errors[0].replace(/"/g, ''));
    return responseUtil.response(res);
  }
  return next();
};
export default validateSchema;

