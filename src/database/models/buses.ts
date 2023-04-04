import {Model} from "sequelize"
interface BusesAttributes {
   id: number;
   plate_number: string;
   name: string;
   model: string;
   available_sits: number,
   driverId: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class buses extends Model<BusesAttributes>
      implements BusesAttributes {
        declare id: number;
        declare name: string;
        declare available_sits: number;
        declare model: string;
        declare plate_number: string;
        declare driverId: number;
    
      static associate(models:any) {
      buses.belongsTo(models.users, {
        foreignKey: 'driverId',
        as: 'driver',
      });
    }
  }

buses.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    plate_number: {
      type: DataTypes,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available_sits: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }

  },
  {
    sequelize,
    tableName: 'buses',
    timestamps: true,
    //paranoid: true,
  }
)

return buses
}



