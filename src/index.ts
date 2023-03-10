import express from 'express'
import connection from './database/connection'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

const normalResponse = {
    msg: 'App running.'
}
const exceptionalResponse= {
    msg: 'Wow! you\'re a deep digger'
}
app.use('/', (req, res) => {
    res.json(normalResponse)
})

app.use('*', (req, res) => {
    
    res.json(exceptionalResponse)
})

const start = async (): Promise<void> => {
    try {
      await connection.sync();
      app.listen(port, () => {
        console.log(`Server started on port ${port}`);
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  void start();