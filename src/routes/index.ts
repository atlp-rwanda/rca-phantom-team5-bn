import Router from 'express'
import authRouter from './authRouter'
import usersRouter from './usersRouter'
import routesRouter from './authRouter'
import busRouter from './busesRouters'
import routeRouter from './routesRouter'
import locationRouter from './locationsRouter'



const router = Router()
router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/routes', routesRouter)
router.use("/buses",busRouter)
router.use("/routes", routeRouter)
router.use("/locations", locationRouter)


export default router
