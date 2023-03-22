import models from "../../../database/models/index";
const { stops } = models;

const createStops = async (data:any) => {

    try{
        const stop = await stops.create(data)
        return stop;
    } catch(error:any){
        throw new Error(error);
    }
};

const getStops = async (page=1, limit=2) =>{
  const offset = (page -1) *limit;
  const data = await stops.findAndCountAll({limit,offset});
  return data;
};

const getStop = async (id: number) => {
    const data = await stops.findOne({ where: { id } });
    return data;
  };

  const updateStop=async(id:number,data:any)=>{
    try {
      const[affectedCount]= await stops.update(data,{
        where:{id:id}
      })
      return affectedCount;
    } catch (error:any) {
      throw new Error('Stop not found')

    }
  }

  const deleStop = async (id:number) => {
    const result = await stops.destroy({where: { id:id },force: true});

    if (result) {
      const stop = await stops.findOne({ where: { id } })
      return stop
    }else{
      throw new Error('Stop not found')
    }
};



  export default { createStops, getStops, getStop, updateStop, deleStop};

