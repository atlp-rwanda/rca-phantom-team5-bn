import models from '../../../database/models/index'
const { buses } = models

const getBuses = async (page = 1, limit = 2) => {
  const offset = (page - 1) * limit;
  const data = await buses.findAndCountAll({limit,offset})
  return data
}


const getABus = async (id: number) => {
    const data = await buses.findOne({ where: { id } })
    return data
  }


  const deleteBus = async (id:number) => {
      const result = await buses.destroy({where: { id:id },force: true});

      if (result) {
        const bus = await buses.findOne({ where: { id } })
        return bus
      }else{
        throw new Error('User not found')
      }
  }
  
  const createBus=async(busData:any)=>{
   try {
    const bus= await buses.create(busData)
    return bus;
   } catch (error:any) {
    throw new Error(error)
   }
  }
  

  const updateBus=async(busId:number,busData:any)=>{
    try {
      const[affectedCount]= await buses.update(busData,{
        where:{id:busId}
      })
      return affectedCount;
    } catch (error:any) {
      throw new Error('Bus not found')

    }
  }

export default { getBuses, getABus,deleteBus, createBus,updateBus}