import { Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "http-status";

import responseUtil from "../../../utils/responseUtil";
import authRepository from "../repository/authRepository";
import {  comparePassword } from "../../../utils/passwordUtils";
import usersRepository from "../../users/repository/usersRepository";

const signIn = async (req: Request, res: Response) => {
  try {
    const user = await usersRepository.getUserByEmail(req.body.email);
    if (!user) {
      responseUtil.handleError(NOT_FOUND, "Invalid email or password");
      return responseUtil.response(res);
    }

    const validPassowrd = comparePassword(req.body.password, user.password);
    if (!validPassowrd) {
      responseUtil.handleError(NOT_FOUND, "Invalid email or password");
      return responseUtil.response(res);
    }

    const userSession: any = { user_id: user.id, device_id: req.body.device_id };
    const data = await authRepository.createUserSession(userSession);

    responseUtil.handleSuccess(OK, "Success", data);
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
};

export default { signIn };
