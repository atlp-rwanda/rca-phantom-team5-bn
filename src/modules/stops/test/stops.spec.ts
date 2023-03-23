import chai, { expect } from "chai";
import sinon from 'sinon';
import chaiHttp from "chai-http";
import { NOT_FOUND, BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } from 'http-status';
import models from "../../../database/models/index";
import app from "../../../index";
import stopsRepository from "../repository/stopsRepository";
const {stops} = models;

chai.use(chaiHttp);
const router = () => chai.request(app);
// const mockStops = [
//   { id: 1, stop_name: 'Stop 1' },
//   { id: 2, stop_name: 'Stop 2' },
//   { id: 3, stop_name: 'Stop 3' },
// ];

describe('true or false', () => {
  // beforeEach(() => {
  //   sinon.stub(stopsRepository, 'getStops').resolves(mockStops);
  // });

  // afterEach(() => {
  //   sinon.restore();
  // });
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

    
    it('User should be able to get a stop by id', (done) =>{
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

    it('User should be able to get a stop by name', (done) =>{
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
            stop_name: 'Kiza'});
        router()
         .put('/api/stops/updateStop/2')
         .send({
            stop_name: 'Kiza'
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
        router()
         .post('/api/stops/createStop')
         .send({
            stop_name: 'Bwanacyambwe'
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
         .delete('/api/stops/deleteStop/3')
         .end((error, response)=>{
            expect(response).to.have.status(OK);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.a('string');
            expect(response.body).to.have.property('data');
            done(error);
         });
    });

      it('Testing internal server error for deleting non-existent stop', (done) => {
        router()
          .delete('/api/stops/deleteStop/999')
          .end((error, response) => {
            expect(response).to.have.status(INTERNAL_SERVER_ERROR);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.an('string');
            done(error);
          });
      });

      it('Testing internal server error for getting a non-existent stop', (done) => {
        sinon.stub(stopsRepository, 'getStop').throws();
        router()
          .get('/api/stops/stop/999')
          .end((error, response) => {
            expect(response).to.have.status(INTERNAL_SERVER_ERROR);
            expect(response.body).to.be.a('object');
            expect(response.body.message).to.be.an('string');
            done(error);
          });
      });

  
    it('Testing internal server error for creating an existent stop', (done) =>{
      router()
       .post('/api/stops/createStop')
       .send({
          stop_name: 'Tumba'
       })
       .end((error, response)=>{
        expect(response).to.have.status(INTERNAL_SERVER_ERROR);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.an('string');
        done(error);
       });
  });

})