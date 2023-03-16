import express from 'express'
import swaggerDocs from './api-docs/swagger'
import createapp from './app'
import connectDb from './database/models'
import { config } from 'dotenv'

config()

const app = createapp()

const PORT = Number(process.env.PORT) || 3000

connectDb().then(() => {
	app.listen(3000, () => {
		console.log('Server is running on port 3000')
	})
	swaggerDocs(app, PORT)
})