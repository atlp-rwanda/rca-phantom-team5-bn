'use strict'
import { Model } from 'sequelize'

interface StopsAttributes {

    createdAt: Date;
    updatedAt: Date;
    id: string;
    stopName: string;
}

module.exports = (sequelize: any, DataTypes: any) => {

    class stops extends Model<StopsAttributes> 
        implements StopsAttributes {
            createdAt!: Date;
            updatedAt!: Date;
            id!: string;
            stopName!: string;
    }
    
    stops.init(
        {
            createdAt: { field: 'createdAt', type: DataTypes.DATE },
            updatedAt: { field: 'updatedAt', type: DataTypes.DATE },
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
            stopName: { type: DataTypes.STRING },
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