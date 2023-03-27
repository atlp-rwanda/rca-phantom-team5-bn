import { Router } from "express";
import stopsController from "../modules/stops/controller/stopsController";

const  stopRouter = Router()

stopRouter.get("/getStops",stopsController.getStops)
stopRouter.get("/getStop/:id", stopsController.getStop)
stopRouter.post("/createStop", stopsController.createStops)
stopRouter.delete("/deleteStop/:id", stopsController.deleStop)
stopRouter.put("/updateStop/:id", stopsController.updateStop)

export default stopRouter