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

  const updateUser = async (id: string, data: object ) => {
    
    
    const updatedUser = await  users.update(data, {
      where: { id: id }
    })
    if (updatedUser) {
      const user = await users.findOne({ where: { id } })
      return user
    }else{
      throw new Error('User not found')
    }
  }

export default { getUsers, getUser , updateUser}