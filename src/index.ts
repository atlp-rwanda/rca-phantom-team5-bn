import express from 'express'
import dotenv from 'dotenv'
import connection from './database/config/connection'
import userRoutes from './routes/user';

dotenv.config()
const app = express()

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
	return res.json({
		status: 200,
		message: 'Welcome To Phantom Server.',
		data: []
	})
})

const port = process.env.PORT || 3000

const start = async (): Promise<void> => {
  try {
    await connection.sync();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`)
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();