import cors from 'cors';
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import express, { Request, Response } from 'express'

import routes from './routes'
import * as swaggerDocument from '../swagger.json'

dotenv.config()
const app = express()
const port = process.env.PORT || 3003


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(cors());
app.use('/api', routes)
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


app.get('**', (req: Request, res: Response) => res.status(200).json({
    status: 200,
    message: 'Welcome To Phantom Server',
    data: []
}))

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

export default app;
