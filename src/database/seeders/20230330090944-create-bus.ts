import { QueryInterface } from 'sequelize'

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
  name: 'Kbs',
  available_sits: 90,
  driver_id:1,
  route_id: 2,
  model: 'XLiu',
  plate_number: 'RCA125G'
}

const busThree = {
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Kbs',
  available_sits: 90,
  driver_id:1,
  route_id: 2,
  model: 'XLiu',
  plate_number: 'RCA125A'
}

const busFour = {
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Safari',
  route_id: 4,
  available_sits: 30,
  model: 'benz',
  plate_number: 'RCA125F'

}

const busFive = {
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Volcano',
  route_id: 3,
  available_sits: 30,
  model: 'Honda',
  plate_number: 'RCA125C'

}

const busSix = {
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Volcano',
  route_id: 6,
  driver_id: 6,
  available_sits: 30,
  model: 'Honda',
  plate_number: 'RCA129C'

}
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('buses', [busOne, busTwo, busThree, busFour, busFive, busSix])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('buses', [], {})
export { up, down }
