import { QueryInterface  } from 'sequelize'

const routeOne = {
  createdAt: new Date(),
  updatedAt: new Date(),
  route_name: 'Kimironko-Gikondo',
  start: 1,
  end: 10,
  stops: [1,2],
  way_points: [2]
}
const routetwo = {
  createdAt: new Date(),
  updatedAt: new Date(),
  route_name: 'Remera-Nyabugogo',
  start: 2,
  end: 5,
  stops: [1],
  way_points: [2]
}
const routethree = {
  createdAt: new Date(),
  updatedAt: new Date(),
  route_name: 'Remera-Gikondo',
  start: 2,
  end: 10,
  stops: [2],
  way_points: [1]
}
const routefour = {
  createdAt: new Date(),
  updatedAt: new Date(),
  route_name: 'Kicukiro-Nyabugogo',
  start: 4,
  end: 5,
  stops: [4],
  way_points: [2]
}
const routefive = {
  createdAt: new Date(),
  updatedAt: new Date(),
  route_name: 'Gikondo-ndera',
  start: 10,
  end: 7,
  stops: [10],
  way_points: [1]
}

const routeSix = {
  createdAt: new Date(),
  updatedAt: new Date(),
  route_name: 'Nyabugogo-Remera',
  start: 5,
  end: 2,
  stops: [10],
  way_points: [1]
}
  
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('routes', [routeOne, routetwo, routethree, routefour, routefive, routeSix])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('routes', [], {})
export { up, down }