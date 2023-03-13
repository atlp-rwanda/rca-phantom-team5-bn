import dotenv from 'dotenv'

dotenv.config()


export default {
	test: {
		dialect: { dialect: 'postgres' },
		url: process.env.DATABASE_URL,
		logging: false,
	},

	development: {
		dialect: { dialect: 'postgres' },
		url: process.env.DATABASE_URL,
		logging: false,
	},

	production: {
		dialect: { dialect: 'postgres' },
		url: process.env.DATABASE_URL,
		logging: false,
	}
}