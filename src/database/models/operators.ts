'use strict'
import { Model } from 'sequelize'
interface operatorsAttributes {
           createdAt:Date;
            updatedAt:Date;
            fname:string;
            lname:string;
            email:string;
            nid:string;
            password:string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class operators extends Model<operatorsAttributes> 
        implements operatorsAttributes {
            createdAt!:Date;
            updatedAt!:Date;
            fname!:string;
            lname!:string;
            email!:string;
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
    
        operators.init(
        {
            createdAt: { field: 'createdAt', type: DataTypes.DATE },
            updatedAt: { field: 'updatedAt', type: DataTypes.DATE },
            fname:{type:DataTypes.STRING},
            lname:{type:DataTypes.STRING},
            email:{type:DataTypes.STRING},
            nid:{type:DataTypes.STRING,primaryKey:true},
            password:{type:DataTypes.STRING},
           
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName:'operators'
        }
    )

    return operators
}