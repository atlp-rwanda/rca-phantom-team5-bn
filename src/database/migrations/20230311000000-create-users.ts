import { QueryInterface, DataTypes  } from 'sequelize'
​
module.exports = { async up(queryInterface: QueryInterface) { await queryInterface.createTable('users', {
    created_at: { allowNull: false, type: DataTypes .DATE },
    updated_at: { allowNull: false, type: DataTypes .DATE },
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes .INTEGER },
    email: { type: DataTypes .STRING },
    phone: { type: DataTypes .STRING },
    first_name: { type: DataTypes .STRING },
    last_name: { type: DataTypes .STRING },
    is_phone_verified: { type: DataTypes .BOOLEAN }
}) }, async down(queryInterface: QueryInterface) { await queryInterface.dropTable('users') }, }