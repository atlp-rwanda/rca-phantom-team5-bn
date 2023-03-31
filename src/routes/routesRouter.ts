import { Router } from "express";
import routesController from "../modules/routes/controller/routesController";

const  routeRouter = Router()

routeRouter.get("/get-routes", routesController.getRoutes)
routeRouter.get("/get-route/:id", routesController.getRoute)
routeRouter.post("/createRoutes", routesController.createRoutes)
routeRouter.delete("/deleteRoute/:id", routesController.deleteRoute)
routeRouter.put("/updateRoute/:id", routesController.updateRoute)

export default routeRouter