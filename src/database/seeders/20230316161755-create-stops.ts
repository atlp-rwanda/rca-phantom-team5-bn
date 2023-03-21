import { QueryInterface  } from 'sequelize'

const stopOne = {
  createdAt: new Date(),
  updatedAt: new Date(),
  stop_name: 'Nyabugogo',
 
}
  
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('stops', [stopOne])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('stops', [], {})
export { up, down }