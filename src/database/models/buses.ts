'use strict'
import { Model } from "sequelize"

interface BusAttributes{
    id:string;
    location:string;
    plate_number:string;
    available_sits:number;
    agency_id:number;
    commuter_id:number;
    createdAt: Date;
    updatedAt: Date;

}

module.exports = (sequelize: any, DataTypes: any) =>{
    class buses extends Model<BusAttributes>implements BusAttributes{
        createdAt!: Date;
        updatedAt!: Date;
        id!: string;
        plate_number!: string;
        location!:string;
        available_sits!: number;
        agency_id!:number;
        commuter_id!:number;
        static associate(models: any) {
            // buses.belongsToMany(models.agencies, {
            //     foreignKey: agency_id',
            //     through: 'agencies',
            //     as: 'agency',
            // })
        }

    }

    buses.init(
        {
            createdAt: { field: 'createdAt', type: DataTypes.DATE },
            updatedAt: { field: 'updatedAt', type: DataTypes.DATE },
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
            location: { type: DataTypes.STRING },
            plate_number: { type: DataTypes.STRING },
            available_sits: { type: DataTypes.INTEGER },
            agency_id: { type: DataTypes.INTEGER },
            commuter_id: { type: DataTypes.INTEGER },
        },

        {
            sequelize,
            timestamps: true,
            underscored: true,
            tableName: 'buses',
            modelName: 'buses',
        }
    )

    return buses
}