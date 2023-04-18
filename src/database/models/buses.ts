import {Model} from "sequelize"
interface BusesAttributes {
   id: number;
   route_id: number;
   driver_id: number
   plate_number: string;
   name: string;
   model: string;
   available_sits: number,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class buses extends Model<BusesAttributes>
      implements BusesAttributes {
        declare id: number;
        declare route_id: number;
        declare driver_id: number;
        declare name: string;
        declare available_sits: number;
        declare model: string;
        declare plate_number: string;
        
    
      static associate(models:any) {
      buses.belongsTo(models.users, {
        foreignKey: 'driver_id',
        as: 'driver',
      });
          buses.belongsTo(models.routes, { as: 'routes', foreignKey: 'route_id' })
    }
  }
  
buses.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    route_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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



