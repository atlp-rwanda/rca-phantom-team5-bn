'use strict'
import { Model } from 'sequelize'

interface UserAttributes {
    createdAt: Date;
    updatedAt: Date;
    id: string;
    name: string;
    email: string;
    password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class users extends Model<UserAttributes> 
        implements UserAttributes {
            createdAt!: Date;
            updatedAt!: Date;
            id!: string;
            name!: string;
            email!: string;
            password!: string;
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
            createdAt: { field: 'createdAt', type: DataTypes.DATE },
            updatedAt: { field: 'updatedAt', type: DataTypes.DATE },
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
            name: { type: DataTypes.STRING },
            email: { type: DataTypes.STRING },
            password: { type: DataTypes.STRING },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            tableName: 'users',
            modelName: 'users',
        }
    )

    return users
}
