import { Console, error } from "console";
import { Request,Response } from "express";
import passwordFunctions from "../../../utils/passwordUtils";
import sendEmail from "../../../services/mailer";
import operatorsRepository from "../repository/operatorsRepository";
import { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST} from "http-status";
import responseUtil from "../../../utils/responseUtil";




const RegisterOperator = async (req:Request,res:Response)=>{
  
  const SearchDriverByEmail = await operatorsRepository.findOperatorByEmail(req.body.email);
   const SearchDriverByNid   = await operatorsRepository.getOperator(req.body.nid);
   
  if(SearchDriverByNid == null && SearchDriverByEmail == null){
  
    let password= passwordFunctions.GenerateUserPassword();
    const hashedpassword =await passwordFunctions.HashPassword(password);
   
        const NewOperator ={
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            nid:req.body.nid,
            password:hashedpassword,
            createdAt:Date.now(),
            updatedAt:Date.now(),
   }
        try {
          const driver = await operatorsRepository.createOperator(NewOperator)
          responseUtil.handleSuccess(OK, 'Success',driver)
        await sendEmail("phantom5.com",NewOperator.fname,NewOperator.email," YOUR OPERATOR SIGN IN PASSWORD",password);
          return responseUtil.response(res)
        } catch (err:any) {
          responseUtil.handleError(INTERNAL_SERVER_ERROR, err.toString())
          return responseUtil.response(res)
        }
}
else{
  return res.status(404).json({
    message:" Operator Already exist !! National Id or email has been used"
  })
}
}

const listOfOperators = async (req:Request,res:Response)=>{
  const drivers = await operatorsRepository.getOperators() 
  responseUtil.handleSuccess(OK, 'Success', drivers)
  return responseUtil.response(res)

 
}


export default {RegisterOperator,listOfOperators}