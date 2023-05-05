import { QueryInterface } from 'sequelize'

const locationOne = {
  createdAt: new Date(),
  updatedAt: new Date(),
  location_name: 'Kimironko',
  latitude: -1.9362376,
  longitude: 30.130060100000037
}
const locationTwo = {
  createdAt: new Date(),
  updatedAt: new Date(),
  location_name: 'Remera',
  latitude: -1.9647362028782875,
  longitude: 30.148948779461183,
}

const locationThree = {
  createdAt: new Date(),
  updatedAt: new Date(),
  location_name: 'Gatenga',
  latitude: -1.951542,
  longitude: 30.109847,
}
const locationfour = {
  createdAt: new Date(),
  updatedAt: new Date(),
  location_name: 'Kicukiro', 
  latitude: -1.984046,
  longitude: 30.104083
}
const locationfive = {
  createdAt: new Date(),
  updatedAt: new Date(),
  location_name: 'Nyabugogo',
  latitude: -1.942111,
  longitude: 30.043433,
}

const locationsix = {
  createdAt: new Date(),
  updatedAt: new Date(),
  location_name: 'Kacyiru',
  latitude:-1.9333928457956164,
  longitude: 30.074104973186625,
}
const locationseven = {
  createdAt: new Date(),
  updatedAt: new Date(),
  location_name: 'Ndera',
  latitude: -1.9470657791624806,
  longitude: 30.17314183704839
}
const locationeight = {
  createdAt: new Date(),
  updatedAt: new Date(),
  location_name: 'Gisozi',
  latitude: -1.914807242342474,
  longitude: 30.06444467577999,
}

const locationnine = {
  createdAt: new Date(),
  updatedAt: new Date(),
  location_name: 'Nyanza',
  latitude: -1.983325329359245,
  longitude: 30.102497586212607,
}
const locationten = {
  createdAt: new Date(),
  updatedAt: new Date(),
  location_name: 'Gikondo',
  latitude: -1.969238075384687,
  longitude: 30.072066497173488,
}

const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('locations', [locationOne, locationTwo, locationThree, locationfour, locationfive, locationsix, locationseven, locationeight, locationnine, locationten])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('locations', [], {})
export { up, down }