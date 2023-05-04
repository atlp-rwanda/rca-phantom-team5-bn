import { QueryInterface  } from 'sequelize'

const busOne = {
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Toyota Corolla',
  available_sits: 5,
  model: 'XLiu',
  plate_number: 'RCA125E'

}

const busTwo = {
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'BMW',
  available_sits: 5,
  model: 'XLiu',
  plate_number: 'RCA125A'

}

const busFour = {
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Safaris',
  route_id:4,
  available_sits: 5,
  model: 'benz',
  plate_number: 'RCA125F'

}
const busFive = {
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Volcano',
  route_id:3,
  available_sits: 5,
  model: 'Honda',
  plate_number: 'RCA125C'

}
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('buses', [busOne, busTwo,busThree,busFour,busFive,busThree,busFour,busFive])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('buses', [], {})
export { up, down }
