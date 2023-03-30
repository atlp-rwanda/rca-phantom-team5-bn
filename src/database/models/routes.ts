'use strict'
import { Model } from 'sequelize'

interface RoutesAttributes {

    createdAt: Date;
    updatedAt: Date;
    id: number;
    route_name: string;
    start: string;
    end: string;
    stops: Array<string>;
}

module.exports = (sequelize: any, DataTypes: any) => {

    class routes extends Model<RoutesAttributes> 
        implements RoutesAttributes {
            createdAt!: Date;
            updatedAt!: Date;
            id!: number;
            route_name!: string;
            start!: string;
            end!: string;
            stops!: Array<string>;
    }
    
    routes.init(
        {
            createdAt: { field: 'createdAt', type: DataTypes.DATE },
            updatedAt: { field: 'updatedAt', type: DataTypes.DATE },
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
            route_name: { type: DataTypes.STRING, allowNull: false },
            start: { type: DataTypes.STRING, allowNull: false },
            end: { type: DataTypes.STRING, allowNull: false },
            stops: { type: DataTypes.ARRAY(DataTypes.STRING) },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            tableName: 'routes',
            modelName: 'routes',
        }
    )

    return routes
}