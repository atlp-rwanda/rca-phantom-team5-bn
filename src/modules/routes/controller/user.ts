import { Router } from 'express'
import User from '../../../database/models/users'

const router = Router()

router.get('/', async (req, res) => {
	const data = await User.findAll()
	res.json({
		data
	})
})

export default router