'use strict'
import {Model} from "sequelize"
import { Agency } from './agency';

class Bus extends Model {
  public id!: number;
  public name!: string;
  public make!: string;
  public model!: string;
  public year!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public agencyId!: number;
  
  public readonly agency?: Agency;

  // Define other model methods and properties here
}

module.exports = (sequelize: any, DataTypes: any) => {
Bus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    make: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    agencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'buses',
    timestamps: true,
    paranoid: true,
  }
);

// Define the association with Agency
Bus.belongsTo(Agency, {
  as: 'agency',
  foreignKey: {
    name: 'agencyId',
    allowNull: false,
  },
});
return Bus
}

export { Bus };

