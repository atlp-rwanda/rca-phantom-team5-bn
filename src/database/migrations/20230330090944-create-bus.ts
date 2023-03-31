import { QueryInterface, DataTypes  } from 'sequelize'

module.exports = { async up(queryInterface: QueryInterface) { await queryInterface.createTable('buses', {
    createdAt: { allowNull: false, type: DataTypes.DATE },
    updatedAt: { allowNull: false, type: DataTypes.DATE },
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    plate_number: { type: DataTypes.STRING,unique:true,allowNull:false},
    name: { type: DataTypes.STRING },
    available_sits: { type: DataTypes.INTEGER },
    model: { type: DataTypes.STRING },
}) }, async down(queryInterface: QueryInterface) { await queryInterface.dropTable('buses') }, }
