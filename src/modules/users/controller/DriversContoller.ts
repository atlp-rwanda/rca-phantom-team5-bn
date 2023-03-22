import { Console, error } from "console";
import { Request,Response } from "express";
import* as fs from "fs"
import passwordFunctions from "../../../utils/passwordUtils";
import sendEmail from "../../../services/mailer";
import driversRepository from "../repository/driversRepository";
import { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST} from "http-status";
import responseUtil from "../../../utils/responseUtil";


const RegisterDrivers = async (req:Request,res:Response)=>{

const SearchDriverByEmail = await driversRepository.findDriverByEmail(req.body.email);
const SearchDriverByNid   = await driversRepository.getDriver(req.body.nid);
    
if(SearchDriverByNid == null && SearchDriverByEmail == null){
  
let password= passwordFunctions.GenerateUserPassword();
const hashedpassword =await passwordFunctions.HashPassword(password);
      const Newdriver ={
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            driver_licence:req.body.driver_licence,
            nid:req.body.nid,
            password:hashedpassword,
            createdAt:Date.now(),
            updatedAt:Date.now(),

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
else{
  return res.status(404).json({
    message:" Driver Already exist !! National Id or email has been used"
  })
}
}
  const listOfDriver = async (req:Request,res:Response)=>{
  const drivers = await driversRepository.getDrivers() 
  responseUtil.handleSuccess(OK, 'Success', drivers)
  return responseUtil.response(res)
}
export default {RegisterDrivers,listOfDriver}