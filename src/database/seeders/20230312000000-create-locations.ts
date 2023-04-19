import { QueryInterface  } from 'sequelize'

const locationOne = {
  createdAt: new Date(),
  updatedAt: new Date(),
  location_name: 'Kimironko',
  latitude:  -1.9362376,
  longitude: 30.130060100000037
}
const locationTwo = {
  createdAt: new Date(),
  updatedAt: new Date(),
  location_name: 'Remera',
  latitude: -1.951542,
  longitude: 30.109847,
}

const locationThree = {
  createdAt: new Date(),
  updatedAt: new Date(),
  location_name: 'Gatenga',
  latitude: -1.951542,
  longitude: 30.109847,
}
  
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('locations', [locationOne, locationTwo, locationThree])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('locations', [], {})
export { up, down }