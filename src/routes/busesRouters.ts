import { Router } from 'express'
import bussesController from "../modules/buses/controller/busesController"

const busRouter=Router()

busRouter.get("/all-buses",bussesController.findAllBuses)
busRouter.get("/bus/:id",bussesController.findBus)
busRouter.post("/create",bussesController.createBus)
busRouter.delete("/delete/:id",bussesController.deleteBus)
busRouter.put("/update/:id",bussesController.updateBus)


export default busRouter