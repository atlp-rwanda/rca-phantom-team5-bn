import models from '../../../database/models/index'
const {drivers} = models


const getDrivers = async () => {
    const data = await drivers.findAll({ order: [['nid', 'ASC']] })
    return data
  }
  
  
  const getDriver = async (nid: string) => {
      const data = await drivers.findOne({ where: { nid } })
      return data
    }
    
  const findDriverByEmail = async (email:string)=>{
    const data = await drivers.findOne({ where: { email } })
    return data
  }  

    const createDriver=async(driverData:any)=>{
        try {
         const driver= await drivers.create(driverData)
         return driver;
        } catch (error:any) {
         throw new Error(error)
        }
       }


export default { getDrivers, getDriver,createDriver,findDriverByEmail}   




function async(arg0: any) {
    throw new Error('Function not implemented.')
}

