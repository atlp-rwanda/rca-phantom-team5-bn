import {Model,DataTypes} from "sequelize"
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

module.exports=(sequelize:any)=>{
Bus.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
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
);
}

// Define the association with Agency
Bus.belongsTo(Agency, {
  as: 'agency',
  foreignKey: {
    name: 'agencyId',
    allowNull: false,
  },
});


export { Bus };

