import { QueryInterface  } from 'sequelize'
import { hashPassword } from '../../utils/passwordUtils'

const userOne = {
  created_at: new Date(),
  updated_at: new Date(),
  role: 'driver',
  fname: 'john',
  lname: 'Doe',
  driver_licence:['A','B','C','D','E','F'],
  nid: '1997988947289789',
  email:'demo@demo.com',
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
  email:'peter@demo.com',
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
  


  
const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('users', [userOne, usertwo, userThree, userFour])
const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('users', [], {})
export { up, down }