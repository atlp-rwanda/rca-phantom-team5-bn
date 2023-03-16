import dotenv from 'dotenv'


dotenv.config()
module.exports = {
    test: {
        dialect: 'postgres',
        url: process.env.DATABASE_URL,
        logging: false,
    },

    development: {
        dialect: 'postgres',
        url: process.env.DATABASE_URL,
        logging: false,
    },

    production: {
        dialect: 'postgres',
        url: process.env.DATABASE_URL,
        logging: false,
    }
}