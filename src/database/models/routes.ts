'use strict'
import { Model } from 'sequelize'
interface RoutesAttributes {

    createdAt: Date;
    updatedAt: Date;
    id: number;
    route_name: string;
    start: number;
    end: number;
    stops: Array<number>;
    way_points: Array<number>;
}
module.exports = (sequelize: any, DataTypes: any) => {
    class routes extends Model<RoutesAttributes> 
        implements RoutesAttributes {
            declare createdAt: Date;
            declare updatedAt: Date;
            declare id: number;
            declare route_name: string;
            declare start: number;
            declare end: number;
            declare stops: Array<number>;
            declare way_points: Array<number>;
            static associate(models: any) {
                routes.hasMany(models.buses, { as: 'buses', foreignKey: 'route_id' })
                routes.belongsTo(models.locations, { as: 'locations_start', foreignKey: 'start' })
                routes.belongsTo(models.locations, { as: 'locations_end', foreignKey: 'end' })
                routes.belongsTo(models.locations, { as: 'locations_stops', foreignKey: 'stops' })
                routes.belongsTo(models.locations, { as: 'locations_way_points', foreignKey: 'way_points' })
            }
    }
     routes.init(
        {
            createdAt: { field: 'createdAt', type: DataTypes.DATE },
            updatedAt: { field: 'updatedAt', type: DataTypes.DATE },
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
            route_name: { type: DataTypes.STRING, allowNull: false },
            start: { type: DataTypes.INTEGER, allowNull: false },
            end: { type: DataTypes.INTEGER, allowNull: false },
            stops: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
            way_points: { type: DataTypes.ARRAY(DataTypes.INTEGER) }
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            tableName: 'routes',
            modelName: 'routes',
        }
    )
    return routes
}