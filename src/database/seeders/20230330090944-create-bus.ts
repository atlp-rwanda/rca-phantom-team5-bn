import { QueryInterface  } from 'sequelize'

const busOne = {
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Toyota Corolla',
  available_sits: 5,
  model: 'XLi',
  plate_number: 'ABC-123',
  driverId: 1

}
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('buses', [busOne])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('buses', [], {})
export { up, down }
