import { QueryInterface, DataTypes  } from 'sequelize'

module.exports = { async up(queryInterface: QueryInterface) { await queryInterface.createTable('buses', {
    createdAt: { allowNull: false, type: DataTypes.DATE },
    updatedAt: { allowNull: false, type: DataTypes.DATE },
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    available_sits: { type: DataTypes.STRING },
    model: { type: DataTypes.STRING },
    plate_number: { type: DataTypes.STRING },
    agencyId: { type: DataTypes.INTEGER },
}) }, async down(queryInterface: QueryInterface) { await queryInterface.dropTable('buses') }, }
