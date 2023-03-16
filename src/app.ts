import express from 'express'
import usersRoute from './modules/routes/controller/user'

export default function createapp() {
	const app = express()

	app.use(express.json())
	app.use('/api/users', usersRoute)

	return app
}