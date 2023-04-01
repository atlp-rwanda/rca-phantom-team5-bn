import { Model } from 'sequelize'

interface UsersAttributes {
    created_at: Date;
    updated_at: Date;
    role: string;
    fname: string;
    lname: string;
    driver_licence:Array<string>;
    nid: string;
    email: string;
    password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class users extends Model<UsersAttributes> 
        implements UsersAttributes {

            declare created_at: Date;
            declare updated_at: Date;
           declare role: string;
           declare fname: string;
           declare lname: string;
           declare driver_licence:Array<string>;
           declare nid: string;
           declare email: string;
           declare password: string;
  static associate(models: any) {
                users.hasMany(models.users_sessions, { as: 'users_sessions', foreignKey: 'user_id' })
            }
        }
    
    users.init(
        {
            created_at: { field: 'created_at', type: DataTypes.DATE },
            updated_at: { field: 'updated_at', type: DataTypes.DATE },
            role: { type: DataTypes.STRING },
            fname: { type: DataTypes.STRING },
            lname: { type: DataTypes.STRING },
            driver_licence: { type:DataTypes.ARRAY(DataTypes.STRING)},
            nid: { type: DataTypes.STRING },
            email: { type: DataTypes.STRING },
            password: { type: DataTypes.STRING },
            
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'users',
        }
    )

    return users
}
