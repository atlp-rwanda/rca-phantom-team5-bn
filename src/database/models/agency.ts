import {Model} from "sequelize"
interface AgenciesAttributes {
   id: number;
   name: string;
   location:string;
}



module.exports = (sequelize: any, DataTypes: any) => {
  class agencies extends Model<AgenciesAttributes> 
      implements AgenciesAttributes {
        declare id: number;
        declare name: string;
        declare location:string;

        static associate(models:any) {
          agencies.hasMany(models.buses, {
            foreignKey: 'agencyId',
            as: 'buses',
          });
        }
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
   location: {
         type:DataTypes.STRING,
         allowNull:false,
    }
  },
  
  {
    sequelize,
    tableName: 'agencies',
    timestamps: true,
   // paranoid: true,
  }
)

return agencies
}



