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
  

  const getUserByEmail = async (email: string) => {
    const data = await users.findOne({
      where : {
        email: email
      }
    })
    return data;
  }
  
  const comparePassword = async (password: string) => {
    const data = await users.findOne({
      where : {
        password: password
      }
    })
    return data;
  }
  
export default { getUsers, getUser, getUserByEmail ,comparePassword}