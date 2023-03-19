import {Model} from "sequelize"
//import { Agency } from './agency';



interface BusesAttributes {
   id: number;
   name: string;
   available_sits: string;
   model: string;
   plate_number: string;
   createdAt: Date;
   updatedAt: Date;
   agencyId: number;
}



module.exports = (sequelize: any, DataTypes: any) => {
  class buses extends Model<BusesAttributes> 
      implements BusesAttributes {
        id!: number;
        name!: string;
        available_sits!: string;
        model!: string;
        plate_number!: string;
        createdAt!: Date;
        updatedAt!: Date;
        agencyId!: number;
          static associate(models: any) {
              buses.belongsToMany(models.agencies, {
                  foreignKey: 'agency_id',
                  through: 'agencies',
                  as: 'agency',
              })
          }
      }
  
buses.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available_sits: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plate_number: {
      type: DataTypes,
      allowNull: false,
    },
    createdAt: {
       type: DataTypes.DATE
       },
      updatedAt: {
          type: DataTypes.DATE
         },
    agencyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'buses',
    timestamps: true,
    paranoid: true,
  }
)

return buses
}



