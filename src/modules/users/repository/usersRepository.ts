import models from '../../../database/models/index'
const { users } = models

const getUsers = async () => {
  const data = await users.findAll({ order: [['id', 'ASC']] })
  return data
}


const getUser = async (id: string) => {
    const data = await users.findOne({ where: { id } })
    return data
  }

export default { getUsers, getUser }