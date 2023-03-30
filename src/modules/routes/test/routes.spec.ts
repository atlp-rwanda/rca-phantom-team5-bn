import chai, { expect } from "chai";
import sinon from 'sinon';
import chaiHttp from "chai-http";
import { NOT_FOUND, BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } from 'http-status';
import models from "../../../database/models/index";
import app from "../../../index";
import routesRepository from "../repository/routesRepository";
const {routes} = models;

chai.use(chaiHttp);
const router = () => chai.request(app);

describe('Routes Test Cases', () => {
    it('Should be able to get Routes', (done) =>{
        router()
         .get('/api/routes/get-routes')
         .end((error, response)=>{
            expect(response).to.have.status(OK);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.a('string');
            expect(response.body).to.have.property('data');
            done(error);
         });
    }); 
    it('Should be able to get a route by id', (done) =>{
        router()
         .get('/api/routes/get-route/1')
         .end((error, response)=>{
            expect(response).to.have.status(OK);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.a('string');
            expect(response.body).to.have.property('data');
            done(error);
         });
    });

    it('Should be able to update a route', (done) =>{
        const route = new routes({
            id:1,
            route_name: 'Kibagabaga-Kacyiru',
            start: 'Kibagabaga',
            end: 'Kacyiru',
            stops: ['KCC','Rando']
        });
        router()
         .put('/api/routes/updateRoute/1')
         .send({
            route_name: 'Kibagabaga-Kacyiru',
            start: 'Kibagabaga',
            end: 'Kacyiru',
            stops: ['KCC','Rando']
         })
         .end((error, response)=>{
            expect(response).to.have.status(OK);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.a('string');
            expect(response.body).to.have.property('data');
            done(error);
         });
    });

    it('Should be able to create a route', (done) =>{
        router()
         .post('/api/routes/createRoutes')
         .send({
            route_name: 'Kimironko-Kacyiru',
            start: 'Kimironko',
            end: 'Kacyiru',
            stops: ['Kimironko Market','KBC','KCC']
         })
         .end((error, response)=>{
            expect(response).to.have.status(OK);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.a('string');
            expect(response.body).to.have.property('data');
            done(error);
         });
    });

    it('Should be able to delete a route', (done) =>{
        router()
         .delete('/api/routes/deleteRoute/1')
         .end((error, response)=>{
            expect(response).to.have.status(OK);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.a('string');
            expect(response.body).to.have.property('data');
            done(error);
         });
    });

    it('Testing internal server error for deleting non-existent route', (done) => {
        router()
          .delete('/api/routes/deleteRoute/999')
          .end((error, response) => {
            expect(response).to.have.status(INTERNAL_SERVER_ERROR);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.an('string');
            done(error);
          });
      });

      it('Testing internal server error for getting a non-existent route', (done) => {
        sinon.stub(routesRepository, 'getRoute').throws();
        router()
          .get('/api/routes/get-route/999')
          .end((error, response) => {
            expect(response).to.have.status(INTERNAL_SERVER_ERROR);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.an('string');
            done(error);
          });
      });    
})