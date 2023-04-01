import { QueryInterface, DataTypes  } from 'sequelize'

module.exports = { async up(queryInterface: QueryInterface) { await queryInterface.createTable('routes', {
    createdAt: { allowNull: false, type: DataTypes.DATE },
    updatedAt: { allowNull: false, type: DataTypes.DATE },
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    route_name: { type: DataTypes.STRING },
    start: { type: DataTypes.STRING },
    end: { type: DataTypes.STRING },
    stops: { type: DataTypes.ARRAY(DataTypes.STRING) },
}) }, async down(queryInterface: QueryInterface) { await queryInterface.dropTable('routes') }, }
