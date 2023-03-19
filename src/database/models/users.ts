'use strict'
import { Model } from 'sequelize'

interface UsersAttributes {
    created_at: Date;
    updated_at: Date;
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class users extends Model<UsersAttributes> 
        implements UsersAttributes {
            created_at!: Date;
            updated_at!: Date;
            id!: string;
            first_name!: string;
            last_name!: string;
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
            created_at: { field: 'created_at', type: DataTypes.DATE },
            updated_at: { field: 'updated_at', type: DataTypes.DATE },
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
            first_name: { type: DataTypes.STRING },
            last_name: { type: DataTypes.STRING },
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