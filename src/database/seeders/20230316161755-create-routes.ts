import { QueryInterface  } from 'sequelize'

const routeOne = {
  createdAt: new Date(),
  updatedAt: new Date(),
  route_name: 'Kimironko-Remera',
  start: 1,
  end: 2,
  stops: [1],
  way_points: [2]
}
const routetwo = {
  createdAt: new Date(),
  updatedAt: new Date(),
  route_name: 'Gikondo-Kibagabaga',
  start: 2,
  end: 1,
  stops: [2],
  way_points: [1]
}
  
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('routes', [routeOne, routetwo])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('routes', [], {})
export { up, down }