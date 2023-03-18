'use strict'
import { Model} from 'sequelize';
import { Bus } from './buses';


class Agency extends Model {
    id!: number;
    name!: string;
    address!: string;
    createdAt!: Date;
    updatedAt!: Date;
 
   // Define other model methods and properties here
    static associate(models: any) {
    Agency.hasMany(Bus, { foreignKey: 'agencyId' });
  }
 }

module.exports = (sequelize: any, DataTypes: any) => {
Agency.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  
  {
    sequelize,
    tableName: 'agencies',
    timestamps: true,
    paranoid: true,
  }
);

// Define the association with Bus
// Agency.hasMany(Bus, {
//   as: 'buses',
//   foreignKey: {
//     name: 'agencyId',
//     allowNull: false,
//   },
// });
}

export { Agency };

