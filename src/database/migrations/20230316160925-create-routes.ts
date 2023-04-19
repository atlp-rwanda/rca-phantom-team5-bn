import { QueryInterface, DataTypes  } from 'sequelize'

module.exports = { async up(queryInterface: QueryInterface) { await queryInterface.createTable('routes', {
    createdAt: { allowNull: false, type: DataTypes.DATE },
    updatedAt: { allowNull: false, type: DataTypes.DATE },
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    route_name: { type: DataTypes.STRING },
    start: { type: DataTypes.INTEGER, references:{ model: 'locations', key: 'id' }},
    end: { type: DataTypes.INTEGER, references:{ model: 'locations', key: 'id' } },
    stops: { type: DataTypes.ARRAY({type: DataTypes.INTEGER})},
    way_points: { type: DataTypes.ARRAY({type: DataTypes.INTEGER})}
}) }, async down(queryInterface: QueryInterface) { await queryInterface.dropTable('routes') }, }
