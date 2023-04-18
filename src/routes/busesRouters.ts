import { Router } from 'express'

import { userAuthorization } from '../middlewares/middleware'
import busesController from "../modules/buses/controller/busesController"
import { validateCreateBus, validateUpdateBus, validateAssignBus } from '../modules/buses/validator/busValidator'

const busRouter=Router()

busRouter
    .get("/get-buses", busesController.getBuses)
    .get("/get-bus/:id", busesController.getBus)
    .post("/create-bus", validateCreateBus, busesController.createBus)
    .delete("/delete-bus/:id", userAuthorization(['operator']), busesController.deleteBus)
    .post("/assign-bus", validateAssignBus,  busesController.assignBus)
    .put("/update-bus/:id" ,  userAuthorization(['operator']), validateUpdateBus , busesController.updateBus)


export default busRouter