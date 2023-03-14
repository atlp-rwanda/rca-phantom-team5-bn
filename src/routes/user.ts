import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
	res.json({
		// users: await user.findAll()
	})
})

export default router