'use strict'
import { Model } from 'sequelize'

interface UsersAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class users extends Model<UsersAttributes> 
        implements UsersAttributes {
           declare id: string;
           declare name: string;
           declare email: string;
           declare password: string;
            static associate(models: any) {
                // users.belongsToMany(models.routes, {
                //     foreignKey: 'route_id',
                //     through: 'routes',
                //     as: 'route',
                // })
            }
        }
    
    users.init(
        {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
            name: { type: DataTypes.STRING },
            email: { type: DataTypes.STRING },
            password: { type: DataTypes.STRING },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'users',
        }
    )

    return users
}