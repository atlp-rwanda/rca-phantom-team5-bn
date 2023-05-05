"use strict";
import { DecimalDataType, Model } from "sequelize";
interface LocationsAttributes {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  location_name: string;
  latitude: DecimalDataType;
  longitude: DecimalDataType;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class locations extends Model<LocationsAttributes> implements LocationsAttributes{
    declare createdAt: Date;
    declare updatedAt: Date;
    declare id: number;
    declare location_name: string;
    declare latitude: DecimalDataType;
    declare longitude: DecimalDataType;
    static associate(models: any) {
      locations.hasMany(models.routes, { as: "routes_stops", foreignKey: "stops"});
      locations.hasMany(models.routes, { as: "routes_start", foreignKey: "start"});
      locations.hasMany(models.routes, { as: "routes_end", foreignKey: "end" });
      locations.hasMany(models.routes, { as: "routes_way_points", foreignKey: "way_points"});
    }
  }
  locations.init(
    {
      createdAt: { field: "createdAt", type: DataTypes.DATE },
      updatedAt: { field: "updatedAt", type: DataTypes.DATE },
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
      location_name: { type: DataTypes.STRING, allowNull: false },
      latitude: { type: DataTypes.DECIMAL, allowNull: false },
      longitude: { type: DataTypes.DECIMAL, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      tableName: "locations",
      modelName: "locations",
    }
  );
  return locations;
};
