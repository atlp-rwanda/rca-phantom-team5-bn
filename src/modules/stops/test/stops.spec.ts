import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import exp from "constants";
import { NOT_FOUND, BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } from 'http-status';
import models from "../../../database/models/index";
import app from "../../../index";
const {stops} = models;

chai.use(chaiHttp);
const router = () => chai.request(app);

describe('true or false', () => {
    it('User should be able to get stops', (done) =>{
        router()
         .get('/api/stops/all-stops')
         .end((error, response)=>{
            expect(response).to.have.status(OK);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.a('string');
            expect(response.body).to.have.property('data');
            done(error);
         });
    });
    it('User should be able to get a stop', (done) =>{
        router()
         .get('/api/stops/stop')
         .end((error, response)=>{
            expect(response).to.have.status(OK);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.a('string');
            expect(response.body).to.have.property('data');
            done(error);
         });
    });

    it('User should be able to update a stop', (done) =>{
        const stop = new stops({
            id:2,
            stop_name: 'Nyamirambo'});
        router()
         .put('/api/stops/updateStop/2')
         .send({
            stop_name: 'Nyamirambo'
         })
         .end((error, response)=>{
            expect(response).to.have.status(OK);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.a('string');
            expect(response.body).to.have.property('data');
            done(error);
         });
    });
    
    it('User should be able to create a stop', (done) =>{
        const stop = new stops({
            stop_name: 'Nyabisindu'});
        router()
         .post('/api/stops/createStop')
         .send({
            stop_name: 'Nyabisindu'
         })
         .end((error, response)=>{
            expect(response).to.have.status(OK);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.a('string');
            expect(response.body).to.have.property('data');
            done(error);
         });
    });

    it('User should be able to delete a stop', (done) =>{
        router()
         .delete('/api/stops/deleteStop/8')
         .end((error, response)=>{
            expect(response).to.have.status(OK);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.a('string');
            expect(response.body).to.have.property('data');
            done(error);
         });
    });

    it('Testing internal server error', (done) => {
        router()
          .put('/api/stops/updateStop/gh')
          .send({
            stop_name: 'Nyamirambo'
          })
          .end((error, response) => {
            expect(response).to.have.status(INTERNAL_SERVER_ERROR);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.an('string');
            done(error);
          });
      });

      it('Testing internal server error', (done) => {
        router()
          .post('/api/stops/createStop')
          .send({
            id:2,
            stopname: 'Nyamirambo'
          })
          .end((error, response) => {
            expect(response).to.have.status(INTERNAL_SERVER_ERROR);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.an('string');
            done(error);
          });
      });

      it('Testing internal server error', (done) => {
        router()
          .delete('/api/stops/deleteStop/gh')
          .send({
            id:2,
          })
          .end((error, response) => {
            expect(response).to.have.status(INTERNAL_SERVER_ERROR);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.an('string');
            done(error);
          });
      });
      it('Testing internal server error', (done) => {
        router()
          .get('/api/stops/stop/gh')
          .send({
            id:2,
          })
          .end((error, response) => {
            expect(response).to.have.status(INTERNAL_SERVER_ERROR);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.an('string');
            done(error);
          });
      });
    

})