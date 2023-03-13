import express from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import morgan from 'morgan'
import usersRouter from './routes/user'
import dotenv from 'dotenv'
import db from './database/models'

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Phantom API',
			version: '1.0.0',
		},
		servers: [
			{
				url: 'http://localhost:3003'
			}
		]
	},
	apis: ['./routes/*.ts']
}


dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
	res.json({
		status: 200,
		message: 'Welcome To Phantom Server.',
		data: []
	})
})

app.use('/users', usersRouter)

const specs = swaggerJsDoc(options)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use(express.json())
app.use(morgan('dev'))


const start = async (): Promise<void> => {
	try {
		await db.sequelize.sync()
		app.listen(port, () => {
			console.log(`Server started on port ${port}`)
		})
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

start()
