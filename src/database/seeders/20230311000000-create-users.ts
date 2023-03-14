module.exports = {
    up: (queryInterface: any, Sequelize: any) => {
      return queryInterface.bulkInsert('Users', [{
          id: '9223372036854775807',
          name: 'John Doe',
          email: 'demo@demo.com',
          password: '$321!pass!123$',
          createdAt: new Date(),
          updatedAt: new Date()
        }], {});
    },
  down: (queryInterface: any, Sequelize: any) => {
      return queryInterface.bulkDelete('Users', null, {});
    }
  };