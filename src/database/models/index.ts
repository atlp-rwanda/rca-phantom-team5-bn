import fs from 'fs'
import path from 'path'
import * as dbConnection from '../configs/config'
import { Sequelize, DataTypes } from 'sequelize'

const db: any = {}
let sequelize: Sequelize
const basename = path.basename(__filename)
const env: string = process.env.NODE_ENV || 'development'
const config: any = dbConnection[env as keyof typeof dbConnection]

if (config?.url) {
	sequelize = new Sequelize(config.url, config, { dialect: 'postgres' })
} else {
	sequelize = new Sequelize(config.database!, config.username!, config.password, config)
}

fs
	.readdirSync(__dirname)
	.filter((file: string) => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts')
	})
	.forEach((file: string) => {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const model = require(path.join(__dirname, file))(sequelize, DataTypes)
		db[model.name] = model
	})

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db