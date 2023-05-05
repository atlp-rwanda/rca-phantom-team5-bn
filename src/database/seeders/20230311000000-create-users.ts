import { QueryInterface  } from 'sequelize'
import { hashPassword } from '../../utils/passwordUtils'


const userOne = {
  created_at: new Date(),
  updated_at: new Date(),
  role: 'driver',
  fname: 'Yassin',
  lname: 'Draxler',
  driver_licence:['A','B','C','D','E','F'],
  nid: '1997988947289789',
  email:'hyassin509@gmail.com',
  is_assigned:false,
  password:hashPassword('$321!pass!123$')
}

const usertwo = {
  created_at: new Date(),
  updated_at: new Date(),
  role: 'operator',
  fname: 'Jane',
  lname: 'Doene',
  driver_licence: null,
  nid: '1967988947289789',
  email:'jane@demo.com',
  password:hashPassword('jane!123$')
}
const userThree = {
  created_at: new Date(),
  updated_at: new Date(),
  role: 'admin',
  fname: 'peter',
  lname: 'patrick',
  driver_licence: null,
  nid: '1967988947289789',
  email: 'peter@demo.com',
  password:hashPassword('peter!123$')
}

const userFour = {
  created_at: new Date(),
  updated_at: new Date(),
  role: 'super_admin',
  fname: 'blessing',
  lname: 'adeline',
  driver_licence: null,
  nid: '1967988965289789',
  email:'blessing@demo.com',
  password:hashPassword('blessing!123$')
}
  
const userFive = {
  created_at: new Date(),
  updated_at: new Date(),
  role: 'driver',
  fname: 'john',
  lname: 'Doe',
  driver_licence:['A','B','C','D','E','F'],
  nid: '1997988947289789',
  email:'demo@demo.com',
  is_assigned:false,
  password:hashPassword('$321!pass!123$')
}

const userSix = {
  created_at: new Date(),
  updated_at: new Date(),
  role: 'driver',
  fname: 'f-driver',
  lname: 'l-driver',
  driver_licence:['A','B','C','D','E','F'],
  nid: '1111111111111111',
  email:'driver@demo.com',
  is_assigned:false,
  password:hashPassword('driver@123$')
}

const userSeven = {
  created_at: new Date(),
  updated_at: new Date(),
  role: 'operator',
  fname: 'f-operator',
  lname: 'l-operator',
  nid: '2222222222222222',
  email:'operator@demo.com',
  is_assigned:false,
  password:hashPassword('operator@123$')
}

const userEight = {
  created_at: new Date(),
  updated_at: new Date(),
  role: 'admin',
  fname: 'f-admin',
  lname: 'l-admin',
  nid: '3333333333333333',
  email:'admin@demo.com',
  is_assigned:false,
  password:hashPassword('admin@123$')
}

const userNine = {
  created_at: new Date(),
  updated_at: new Date(),
  role: 'super_admin',
  fname: 'f-super_admin',
  lname: 'l-super_admin',
  nid: '4444444444444444',
  email:'super_admin@demo.com',
  is_assigned:false,
  password:hashPassword('super_admin@123$')
}

  
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('users', [userOne, usertwo, userThree, userFour,userFive, userSix, userSeven, userEight, userNine])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('users', [], {})
export { up, down }