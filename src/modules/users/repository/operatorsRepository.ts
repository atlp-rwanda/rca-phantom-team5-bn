import models from '../../../database/models/index'
const {operators} = models


const getOperators = async () => {
    const data = await operators.findAll({ order: [['nid', 'ASC']] })
    return data
  }
  
  
  const getOperator = async (nid: string) => {
      const data = await operators.findOne({ where: { nid } })
      return data
    }
    
  const findOperatorByEmail = async (email:string)=>{
    const data = await operators.findOne({ where: { email } })
    return data
  }  

    const createOperator=async(operatorData:any)=>{
        try {
         const operator= await operators.create(operatorData)
         return operator;
        } catch (error:any) {
         throw new Error(error)
        }
       }


export default { getOperators, getOperator,createOperator,findOperatorByEmail}   


function async(arg0: any) {
    throw new Error('Function not implemented.')
}

