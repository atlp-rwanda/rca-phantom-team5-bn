import { Router } from 'express'
import locationsController from '../modules/locations/controllers/locationsController'
import { validLocation } from '../modules/locations/validation/locationsValidator'


const locationRouter=Router()

locationRouter
    .get("/get-locations", locationsController.getLocations)
    .get("/get-location/:id", locationsController.getLocation)
    .post("/create-location" , validLocation , locationsController.createLocation)
    .delete("/delete-location/:id" , locationsController.deleteLocation)
    .put("/update-location/:id" , locationsController.updateLocation)


export default locationRouter