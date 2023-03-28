import models from '../../../database/models/index'
const { agencies } = models

const getAgencies = async () => {
  const data = await agencies.findAll()
  return data
}


const getAgency = async (id: number) => {
    const data = await agencies.findOne({ where: { id } })
    return data
  }


  const deleteAgency = async (id:number) => {
      const result = await agencies.destroy({where: { id:id },force: true});

      if (result) {
        const agency = await agencies.findOne({ where: { id } })
        return agency
      }else{
        throw new Error('Agency not found')
      }
  }
  
  const createAgency=async(agencyData:any)=>{
   try {
    const agency= await agencies.create(agencyData)
    return agency;
   } catch (error:any) {
    throw new Error(error)
   }
  }
  

  const updateAgency=async(agencyId:number,agencyData:any)=>{
    try {
      const[affectedCount]= await agencies.update(agencyData,{
        where:{id:agencyId}
      })
      return affectedCount;
    } catch (error:any) {
      throw new Error('Bus not found')

    }
  }

export default { getAgencies, getAgency,deleteAgency, createAgency,updateAgency}