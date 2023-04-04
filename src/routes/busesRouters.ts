import { Router } from 'express'

import { userAuthorization } from '../middlewares/middleware'
import busesController from "../modules/buses/controller/busesController"
import { validateCreateBus,validateUpdateBus } from '../modules/buses/validator/busValidator'

const busRouter=Router()

busRouter.get("/get-buses", busesController.getBuses)
busRouter.get("/get-bus/:id", busesController.getBus)
busRouter.post("/create-bus" ,  validateCreateBus , busesController.createBus)
busRouter.delete("/delete-bus/:id" , userAuthorization(['operator']) , busesController.deleteBus)
busRouter.put("/update-bus/:id" ,  userAuthorization(['operator']), validateUpdateBus , busesController.updateBus)


export default busRouter