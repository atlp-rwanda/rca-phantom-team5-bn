import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.get('/', (req, res) => {
	return res.json({
		status: 200,
		message: 'Welcome To Phantom Server.',
		data: []
	})
})

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Server is running at http://localhost:${port}`) })