import { Router } from 'express'
import locationsController from '../modules/locations/controllers/locationsController'
import { ValidLocationUpdate, validLocationCreate } from '../modules/locations/validation/locationsValidator'


const locationRouter=Router()

locationRouter
    .get("/get-locations", locationsController.getLocations)
    .get("/get-location/:id", locationsController.getLocation)
    .post("/create-location" , validLocationCreate , locationsController.createLocation)
    .delete("/delete-location/:id" , locationsController.deleteLocation)
    .put("/update-location/:id" , ValidLocationUpdate , locationsController.updatelocation)


export default locationRouter