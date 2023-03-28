import { Router } from 'express'
import agencyController from '../modules/agencies/controller/agencyController'

const agenciesRouter=Router()

agenciesRouter.get("/",agencyController.findAllAgencies)
agenciesRouter.get("/agency/:id",agencyController.findAgency)
agenciesRouter.post("/create",agencyController.createAgency)
agenciesRouter.delete("/delete/:id",agencyController.deleteAgency)
agenciesRouter.put("/update/:id",agencyController.updateAgency)


export default agenciesRouter