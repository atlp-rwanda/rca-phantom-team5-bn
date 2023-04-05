import { Router } from 'express'
import { userAuthorization } from '../middlewares/middleware'
import assignBusesToDrivers from '../modules/buses_drivers/controller/assignBusesToDrivers'
const operatorRouter = Router()

operatorRouter.get("/get-drivers", userAuthorization(['operator']), assignBusesToDrivers.findUsersWithDriverRole)
operatorRouter.post("/assign-driver-to-bus", userAuthorization(['operator']), assignBusesToDrivers.assignDriverToBus)

export default operatorRouter;