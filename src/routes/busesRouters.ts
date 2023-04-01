import { Router } from 'express'

import { authorizationToken,userAuthorization } from '../middlewares/authMiddleware'
import busesController from "../modules/buses/controller/busesController"
import { validateCreateBus,validateUpdateBus } from '../modules/buses/validator/busValidator'

const busRouter=Router()

busRouter.get("/get-buses", busesController.getBuses)
busRouter.get("/get-bus/:id", busesController.getBus)
busRouter.post("/create-bus", authorizationToken,userAuthorization(['operator']), validateCreateBus , busesController.createBus)
busRouter.delete("/delete-bus/:id", authorizationToken , userAuthorization(['operator']) , busesController.deleteBus)
busRouter.put("/update-bus/:id", authorizationToken ,userAuthorization(['operator']) , validateUpdateBus , busesController.updateBus)


export default busRouter