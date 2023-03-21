'use strict'
import { Model } from 'sequelize'
interface driversAttributes {
            fname:string;
            lname:string;
            email:string;
            driver_licence:string;
            nid:string;
            password:string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class drivers extends Model<driversAttributes> 
        implements driversAttributes {
            
            fname!:string;
            lname!:string;
            email!:string;
            driver_licence!:string;
            nid!:string;
            password!:string;
            static associate(models: any) {
                // users.belongsToMany(models.routes, {
                //     foreignKey: 'route_id',
                //     through: 'routes',
                //     as: 'route',
                // })
            }
        }
    
    drivers.init(
        {
            fname:{type:DataTypes.STRING},
            lname:{type:DataTypes.STRING},
            email:{type:DataTypes.STRING},
            driver_licence:{type:DataTypes.STRING},
            nid:{type:DataTypes.STRING,primaryKey:true},
            password:{type:DataTypes.STRING},
           
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName:'drivers'
        }
    )

    return drivers
}