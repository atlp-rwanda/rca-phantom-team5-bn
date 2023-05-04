import cors from 'cors';
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import express, { Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io';

import routes from './routes'
import * as swaggerDocument from '../swagger.json'
import SocketConnection from './socket';

dotenv.config()
const app = express()
const port = process.env.PORT || 3003
const httpServer = http.createServer(app)
try {
  
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
    pingTimeout: 60000,

  })


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


  io.on("connection", (socket) => SocketConnection(socket, io))

  httpServer.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })

} catch (err: any) {
  console.log(err.message)
}

export default httpServer;
