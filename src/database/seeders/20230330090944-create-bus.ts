import { QueryInterface  } from 'sequelize'

const busOne = {
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Toyota Corolla',
  available_sits: 5,
  model: 'XLiu',
  plate_number: 'RCA125D',
  driverId: null

}
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('buses', [busOne])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('buses', [], {})
export { up, down }
