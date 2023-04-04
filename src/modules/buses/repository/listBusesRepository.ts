import models from '../../../database/models/index'
const { buses } = models

const getBusByRoute = async (id: number) => {
  return await buses.findOne({ where: { id } });
};


export default { getBusByRoute}