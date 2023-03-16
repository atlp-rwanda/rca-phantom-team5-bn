import { QueryInterface  } from 'sequelize'

const userOne = {
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'John Doe',
  email: 'demo@demo.com',
  password: '$321!pass!123$'
}
  
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('users', [userOne])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('users', [], {})
export { up, down }
