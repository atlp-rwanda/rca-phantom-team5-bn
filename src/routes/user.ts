import { Router } from 'express'
import { User } from '../database/models/User'

const router = Router()

router.get('/', (req, res) => {
	res.json({
		message: 'User route'
	})
})

router.get('/create', async (req, res) => {
	const user = await User.create({
		  name: 'John Doe',
		  email:'john@gmail.com',
		  password: '123456'
	  })
	  return res.json({
		  status: 200,
		  message: 'User created successfully.',
		  data: user
	  })
  })

export default router