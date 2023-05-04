import { QueryInterface, DataTypes  } from 'sequelize'

module.exports = { async up(queryInterface: QueryInterface) { await queryInterface.createTable('locations', {
    createdAt: { allowNull: false, type: DataTypes.DATE },
    updatedAt: { allowNull: false, type: DataTypes.DATE },
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    location_name: { type: DataTypes.STRING },
    latitude: { type: DataTypes.DECIMAL },
    longitude: { type: DataTypes.DECIMAL },
}) }, async down(queryInterface: QueryInterface) { await queryInterface.dropTable('locations') }, }
