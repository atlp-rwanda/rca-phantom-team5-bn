import { QueryInterface  } from 'sequelize'
import { hashPassword } from '../../utils/passwordUtils'

const userOne = {
  created_at: new Date(),
  updated_at: new Date(),
  name: 'John Doe',
  email: 'demo@demo.com',
  password: hashPassword('$321!pass!123$')
}

const usertwo = {
  created_at: new Date(),
  updated_at: new Date(),
  name: 'Jane Doene',
  email: 'jane@demo.com',
  password: hashPassword('jane!123$')
}
  
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('users', [userOne, usertwo])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('users', [], {})
export { up, down }
