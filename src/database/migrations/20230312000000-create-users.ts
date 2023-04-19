import { QueryInterface, DataTypes  } from 'sequelize'

module.exports = { async up(queryInterface: QueryInterface) { await queryInterface.createTable('users', {
    created_at: { allowNull: false, type: DataTypes.DATE },
    updated_at: { allowNull: false, type: DataTypes.DATE },
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    role:{ type: DataTypes.STRING },
    fname: { type: DataTypes.STRING },
    lname: { type: DataTypes.STRING },
    driver_licence:{ type: DataTypes.STRING },
    nid:{ type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    is_assigned: { type: DataTypes.BOOLEAN, defaultValue: false },
    password: { type: DataTypes.STRING },
}) }, async down(queryInterface: QueryInterface) { await queryInterface.dropTable('users') }, }