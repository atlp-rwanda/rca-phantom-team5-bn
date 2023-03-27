'use strict'
import { Model } from 'sequelize'

interface UsersSessionAttributes {
    id: string;
    user_id: string;
    device_id: string;
    access_token: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
    class users_sessions extends Model<UsersSessionAttributes> 
        implements UsersSessionAttributes {
            declare id: string;
            declare user_id: string;
            declare device_id: string;
            declare access_token: string;
            static associate(models: any) {
                users_sessions.belongsTo(models.users, { as: 'user', foreignKey: 'user_id' })
            }
        }
        users_sessions.init(
        {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
            user_id: { type: DataTypes.INTEGER },
            device_id: { type: DataTypes.STRING },
            access_token: { type: DataTypes.STRING }
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'users_sessions',
        }
    )
    return users_sessions
}