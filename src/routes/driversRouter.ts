import { Router } from 'express'
import { userAuthorization } from '../middlewares/middleware'
import assignBusesToDrivers from '../modules/buses_drivers/controller/assignBusesToDrivers'
import { validateAssignBusToDriver } from '../modules/buses_drivers/validator/assignBusToDriverValidator'
const driverRouter = Router()

driverRouter.get("/get-drivers", userAuthorization(['operator']), assignBusesToDrivers.findUsersWithDriverRole)
driverRouter.post("/assign-driver-to-bus/bus/:id", validateAssignBusToDriver,  assignBusesToDrivers.assignDriverToBus)

export default driverRouter;