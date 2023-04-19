import { QueryInterface, DataTypes  } from 'sequelize'

module.exports = { async up(queryInterface: QueryInterface) { await queryInterface.createTable('users_sessions', {
    created_at: { allowNull: false, type: DataTypes.DATE },
    updated_at: { allowNull: false, type: DataTypes.DATE },
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    user_id: { type: DataTypes.INTEGER , allowNull:false, references:{ model: 'users', key: 'id' }},
    device_id: { type: DataTypes.STRING },
    access_token: { type: DataTypes.STRING }
}) }, async down(queryInterface: QueryInterface) { await queryInterface.dropTable('users_sessions') }, }
