import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          title: 'driver',
          description:
            'Control the bus movement i.e. start, stop, and change bus speed. View the bus movement. Edit their profile',
          privileges: [
            'control_bus_movement',
            'view_bus_movement',
            'edit_profile',
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'operator',
          description:
            'Manage (create, update, delete) routes. Manage (create, update, delete) buses. Manage (create, update, delete) bus to route assignment. Manage (create, update, delete) driver to bus assignment. View the bus movement. Edit their profile',
          privileges: [
            'manage_routes',
            'manage_buses',
            'manage_bus_route_assignment',
            'manage_driver_bus_assignment',
            'view_bus_movement',
            'edit_profile',
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'administrator',
          description:
            'Register and remove both drivers & operators. Manage (create, update, delete) routes. Manage (create, update, delete) buses. Manage (create, update, delete) bus to route assignment. Manage (create, update, delete) driver to bus assignment. View the bus movement',
          privileges: [
            'register_drivers_operators',
            'manage_routes',
            'manage_buses',
            'manage_bus_route_assignment',
            'manage_driver_bus_assignment',
            'view_bus_movement',
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
