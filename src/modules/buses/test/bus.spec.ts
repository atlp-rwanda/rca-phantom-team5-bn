import chaihttp from 'chai-http';
import chai, { expect } from 'chai';
import { NOT_FOUND, BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } from 'http-status';

import app from '../../../index'
import models from "../../../database/models/index";
const { users } = models;


chai.use(chaihttp);
chai.should();
const router = () => chai.request(app);


describe('POST /cars', () => {
    it('should create a new bus', (done) => {
      const newBus = {
        name: 'Toyota Corolla',
        available_sits: 5,
        model: 'XLi',
        plate_number: 'ABC-123',
        agencyId: 1
      };
      router()
        .post('/buses')
        .send(newBus)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('id');
          expect(res.body.name).to.equal(newBus.name);
          expect(res.body.available_sits).to.equal(newBus.available_sits);
          expect(res.body.model).to.equal(newBus.model);
          expect(res.body.plate_number).to.equal(newBus.plate_number);
          expect(res.body.agencyId).to.equal(newBus.agencyId);
          done();
        });
    });
  });


  describe('Buses', () => {
    describe('GET /buses', () => {
      it('should get all buses', (done) => {
        router()
          .get('/buses')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
    });
  });


  describe('GET /cars/:id', () => {
    it('should return a bus with given id', (done) => {
      router()
      .get('/bus/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.equal(1);
          expect(res.body.name).to.equal('Toyota Corolla');
          expect(res.body.model).to.equal('Corolla');
          expect(res.body.year).to.equal(2015);
          expect(res.body.agencyId).to.equal(1);
          done();
        });
    });
  
    it('should return a 404 if bus is not found', (done) => {
      router()
      .get('/cars/999')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });


  describe('Cars', () => {
    describe('DELETE /bus/:id', () => {
      it('should delete a bus successfully', async () => {
        // First, create a bus to delete
        const res = await
          router()
          .post('/buses')
          .send({
            name: 'Bus to delete',
            available_sits: 4,
            model: 'Model X',
            plate_number: 'ABC123',
            agencyId: 1,
          });
  
        // Ensure the bus was created successfully
        expect(res).to.have.status(201);
        const busId = res.body.id;
  
        // Then, attempt to delete the bus
        const deleteRes = await router().delete(`/bus/${busId}`);
  
        // Ensure the bus was deleted successfully
        expect(deleteRes).to.have.status(204);
      });
  
      it('should return 404 if bus does not exist', async () => {
        // Try to delete a bus that doesn't exist
        const deleteRes = await router().delete('/bus/9999');
  
        // Ensure the response has a 404 status code
        expect(deleteRes).to.have.status(404);
        expect(deleteRes.body).to.have.property('message');
      });
    });
  });


  
describe('Update a bus', () => {
  let busId:string;
  
  before(async () => {
    // create a new car for testing
    const res =await router()
      .post('/buses')
      .send({
        name: 'Test Bus',
        available_sits: '4',
        model: 'Test Model',
        plate_number: 'ABC123',
        agencyId: 1,
      });
    
    busId = res.body.id;
  });
  
  it('should update a bus', async () => {
    const res = await chai
      .request(app)
      .put(`/cars/${busId}`)
      .send({
        name: 'Updated Bus',
        available_sits: '6',
        model: 'Updated Model',
        plate_number: 'DEF456',
        agencyId: 2,
      });
    
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('id').equal(busId);
    expect(res.body).to.have.property('name').equal('Updated Bus');
    expect(res.body).to.have.property('available_sits').equal('6');
    expect(res.body).to.have.property('model').equal('Updated Model');
    expect(res.body).to.have.property('plate_number').equal('DEF456');
    expect(res.body).to.have.property('agencyId').equal(2);
  });
  
  after(async () => {
    // delete the car created for testing
    await router()
      .delete(`/cars/${busId}`);
  });
});