import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import { sequelizeDb } from '.'


class User extends Model { }


User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING
		}
	},
	{
		sequelize: sequelizeDb,
		tableName: 'users',
		timestamps: false
	}
)

export default User