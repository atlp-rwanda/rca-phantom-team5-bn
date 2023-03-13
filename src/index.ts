import express from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import morgan from 'morgan'
import usersRouter from './routes/user'
import dotenv from 'dotenv'

dotenv.config()

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

const app = express()
const port = process.env.PORT || 3003

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


app.listen(port, () => {
	console.info(`server running: http://localhost:${port}`)
})