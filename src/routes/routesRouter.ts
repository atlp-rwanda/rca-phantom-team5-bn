import { Router } from "express";
import routesController from "../modules/routes/controller/routesController";
import { userAuthorization } from "../middlewares/middleware";
import { validateCreateRoute, validateUpdateRoute } from "../modules/routes/validator/routesValidator";

const  routeRouter = Router()

routeRouter.get("/get-routes", routesController.getRoutes)
routeRouter.get("/get-route/:id", routesController.getRoute)
routeRouter.post("/create-routes", userAuthorization(['operator', 'admin', 'super_admin']), validateCreateRoute, routesController.createRoutes)
routeRouter.delete("/delete-route/:id", userAuthorization(['operator', 'admin', 'super_admin']), routesController.deleteRoute)
routeRouter.put("/update-route/:id", userAuthorization(['operator', 'admin', 'super_admin']), validateUpdateRoute, routesController.updateRoute)

export default routeRouter