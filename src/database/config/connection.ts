import { Sequelize } from 'sequelize-typescript'
import { User } from '../models/User'
import dotenv from 'dotenv'

dotenv.config()
const connection = new Sequelize({
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_NAME,
	dialect: 'postgres',
	models: [User],
})

export default connection