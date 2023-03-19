import {Model} from "sequelize"
//import { Agency } from './agency';



interface AgenciesAttributes {
   id: number;
   name: string;
   createdAt: Date;
   updatedAt: Date;
}



module.exports = (sequelize: any, DataTypes: any) => {
  class agencies extends Model<AgenciesAttributes> 
      implements AgenciesAttributes {
        id!: number;
        name!: string;
        createdAt!: Date;
        updatedAt!: Date;
      }
  
agencies.init(
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

    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
  },
  
  {
    sequelize,
    tableName: 'buses',
    timestamps: true,
    paranoid: true,
  }
)

return agencies
}



