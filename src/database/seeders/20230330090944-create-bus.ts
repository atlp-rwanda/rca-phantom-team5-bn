import { QueryInterface  } from 'sequelize'

const busOne = {
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Toyota Corolla',
  available_sits: 5,
  model: 'XLiu',
  plate_number: 'ABC-1234',

}
const busTwo = {
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'BMW',
  available_sits: 7,
  model: 'XLi',
  plate_number: 'ABC-123',

}
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('buses', [busOne, busTwo])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('buses', [], {})
export { up, down }
