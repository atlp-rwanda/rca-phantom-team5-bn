import {Model} from "sequelize"
interface BusesAttributes {
   id: number;
   name: string;
   available_sits: number;
   model: string;
   plate_number: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class buses extends Model<BusesAttributes>
      implements BusesAttributes {
        declare id: number;
        declare name: string;
        declare available_sits: number;
        declare model: string;
        declare plate_number: string;
        static associate(models: any) {
              buses.belongsToMany(models.agencies, {
                foreignKey: 'agencyId',
                as: 'agency',
                through: ""
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plate_number: {
      type: DataTypes,
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



