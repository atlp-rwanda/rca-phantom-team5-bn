import models from '../../../database/models/index'
const { Bus } = models

const getBuses = async () => {
  const data = await Bus.findAll({ order: [['id', 'ASC']] })
  return data
}


const getABus = async (id: string) => {
    const data = await Bus.findOne({ where: { id } })
    return data
  }

export default { getBuses, getABus }