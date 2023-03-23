import { Request, Response } from "express";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR,FORBIDDEN, NOT_FOUND, OK } from "http-status";

import sendEmail from "../../../services/mailService";
import responseUtil from "../../../utils/responseUtil";
import authRepository from "../repository/authRepository";
import {  comparePassword } from "../../../utils/passwordUtils";
import usersRepository from "../../users/repository/usersRepository";
import { use } from "chai";

const registerUsers = async (req:Request,res:Response) => {
  try{
    if (req.body.role === 'operator' && req.body.driver_licence) {
      responseUtil.handleError(BAD_REQUEST, 'Driver licence not required for Operator');
      return responseUtil.response(res);
    }

    const emailExist = await authRepository.getUserByEmail(req.body.email); 
    const nidExist = await authRepository.getUserByNid(req.body.nid);

    if (emailExist) {
      responseUtil.handleError(BAD_REQUEST, 'Email already used');
      return responseUtil.response(res);
    }

    if (nidExist) {
      responseUtil.handleError(BAD_REQUEST, 'National ID Already used ');
      return responseUtil.response(res);
    }
     
    const { createdUser, genPassword } = await authRepository.registerUsers(req.body);
    await sendEmail('https://sign.phantom.transport.com', req.body.fname, req.body.email, 'SIGN-IN PASSWORD', genPassword);

    responseUtil.handleSuccess(CREATED, 'Created', createdUser);
    return responseUtil.response(res);
  } catch (error: any) {
    responseUtil.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseUtil.response(res);
  }
}

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

const logout = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('bearer ')) {
      responseUtil.handleError(FORBIDDEN,'Invalid authorization header');
      return responseUtil.response(res)
  }

  const token = authHeader.slice('bearer'.length).trim();

  const resp =await authRepository.deleteUserSession(token)
  
  if(resp){
    responseUtil.handleSuccess(OK, 'Logout successful',{});
  }else{
    responseUtil.handleError(INTERNAL_SERVER_ERROR, "Error occured")
  }
 
 return responseUtil.response(res)
}


export default { registerUsers, signIn,logout };
