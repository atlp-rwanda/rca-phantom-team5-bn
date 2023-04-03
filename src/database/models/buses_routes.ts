import { Model } from 'sequelize'

interface BusesRoutesAttributes {
    id: number;
    bus_id: number;
    route_id: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class buses_routes extends Model<BusesRoutesAttributes> 
        implements BusesRoutesAttributes {
              declare id: number;
           declare bus_id: number;
           declare route_id: number;
        }
    
        buses_routes.init(
        {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
            bus_id: { allowNull:false, type: DataTypes.INTEGER },
            route_id: { allowNull:false, type: DataTypes.INTEGER },
            
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'buses_routes',
        }
    )

    return buses_routes
}
