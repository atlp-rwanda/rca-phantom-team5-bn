import { Console, error } from "console";
import { Request,Response } from "express";
import* as fs from "fs"
import passwordFunctions from "../../../utils/passwordUtils";
import sendEmail from "../../../services/mailer";
import driversRepository from "../repository/driversRepository";
import { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST} from "http-status";
import responseUtil from "../../../utils/responseUtil";



const getAllDrivers = async (req:Request,res:Response) =>{

}

const RegisterDrivers = async (req:Request,res:Response)=>{
    console.log("in the register drivers")

    console.log(req.body);

//    if(driversRepository.getDriver(req.body.nid) ==null){
    
    let password= passwordFunctions.GenerateUserPassword();
    const hashedpassword =await passwordFunctions.HashPassword(password);
   
        const Newdriver ={
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            driver_licence:req.body.driver_licence,
            nid:req.body.nid,
            password:hashedpassword
   }

   
   
        try {
          const driver = await driversRepository.createDriver(Newdriver)
          responseUtil.handleSuccess(OK, 'Success',driver)
          await sendEmail("phantom5.com",Newdriver.fname,Newdriver.email," YOUR SIGN IN PASSWORD",password);
          return responseUtil.response(res)
        } catch (err:any) {
          responseUtil.handleError(INTERNAL_SERVER_ERROR, err.toString())
          return responseUtil.response(res)
        }
     

}



export default {RegisterDrivers};