import { Sequelize } from 'sequelize'
import { config } from 'dotenv'

config()

export const sequelizeDb = new Sequelize(process.env.DATABASE_URL as string, {
	dialect: 'postgres',
	protocol: 'postgres',
	logging: false,
})


const connectDb = async () => {
	try {
		await sequelizeDb.authenticate()
		console.log('Database connected')
	} catch (error) {
		console.error('Database failed to connect', error)
	}
}

export default connectDb