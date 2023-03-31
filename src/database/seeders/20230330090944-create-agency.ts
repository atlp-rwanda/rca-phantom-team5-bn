import { QueryInterface  } from 'sequelize'

const agencyOne = {
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Stella Express',
  location:"Kigali city"

}
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('agencies', [agencyOne])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('agencies', [], {})
export { up, down }
