import { QueryInterface  } from 'sequelize'

const routeOne = {
  createdAt: new Date(),
  updatedAt: new Date(),
  route_name: 'Kimironko-Town',
  start: 'Kimironko',
  end: 'Town',
  stops: ['Rando','RDB','KBC','KH']
 
}
  
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('routes', [routeOne])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('routes', [], {})
export { up, down }