'use strict'
import { Model } from 'sequelize'

interface StopsAttributes {

    createdAt: Date;
    updatedAt: Date;
    id: number;
    stop_name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {

    class stops extends Model<StopsAttributes> 
        implements StopsAttributes {
            createdAt!: Date;
            updatedAt!: Date;
            id!: number;
            stop_name!: string;
    }
    
    stops.init(
        {
            createdAt: { field: 'createdAt', type: DataTypes.DATE },
            updatedAt: { field: 'updatedAt', type: DataTypes.DATE },
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
            stop_name: { type: DataTypes.STRING, allowNull: false },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            tableName: 'stops',
            modelName: 'stops',
        }
    )

    return stops
}