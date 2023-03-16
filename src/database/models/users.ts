import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import { sequelizeDb } from '.'


class User extends Model { }


User.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: () => uuidv4()
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