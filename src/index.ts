import dotenv from 'dotenv'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

import routes from './routes'
import * as swaggerDocument from '../swagger.json'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use('/api', routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('**', (req, res) => res.status(200).json({
    status: 200,
    message: 'Welcome To Phantom Server',
    data: []
}))

app.listen(port, () => { console.log(`Server is running at http://localhost:${port}`) })