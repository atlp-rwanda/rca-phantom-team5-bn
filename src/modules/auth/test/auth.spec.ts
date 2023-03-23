import chaihttp from 'chai-http';
import chai, { expect } from 'chai';
import { NOT_FOUND, BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } from 'http-status';

import app from '../../../index'

chai.use(chaihttp);
const router = () => chai.request(app);

describe('Authentication test cases', () => {
// register user
  it('register operater does not require driver_licence (bad request)', (done) => {
    router()
      .post('/api/auth/register-user')
      .send({
        role: 'operator',
        fname: 'dad',
        lname: 'diane',
        driver_licence:"C",
        nid: '1967984947289789',
        email:'dad@demo.com',
        password:'dad!123$'
      })
      .end((error, response) => {
        expect(response).to.have.status(BAD_REQUEST);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });


  it('register user email exist (bad request)', (done) => {
    router()
      .post('/api/auth/register-user')
      .send({
        role: 'operator',
        fname: 'dad',
        lname: 'diane',
        nid: '1967988947289786',
        email:'jane@demo.com',
      })
      .end((error, response) => {
        expect(response).to.have.status(BAD_REQUEST);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });


  it('register user National ID exist (bad request)', (done) => {
    router()
      .post('/api/auth/register-user')
      .send({
        role: 'operator',
        fname: 'dad',
        lname: 'diane',
        nid: '1967988947289789',
        email:'dad@demo.com',
      })
      .end((error, response) => {
        expect(response).to.have.status(BAD_REQUEST);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });


  it('register operator success', (done) => {
    router()
      .post('/api/auth/register-user')
      .send({
        role: 'operator',
        fname: 'ead',
        lname: 'eiane',
        nid: '2367788947289129',
        email:'ead@demo.com',
      })
      .end((error, response) => {
        expect(response).to.have.status(CREATED);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });



  it('register driver success', (done) => {
    router()
      .post('/api/auth/register-user')
      .send({
        role: 'driver',
        fname: 'aad',
        lname: 'aiane',
        driver_licence:"A",
        nid: '7367788947289129',
        email:'aad@demo.com',
        
      })
      .end((error, response) => {
        expect(response).to.have.status(CREATED);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

//  sign in

  it('Signin should return a user_session on successful signin', (done) => {
    router()
      .post('/api/auth/signin')
      .send({
      email: 'demo@demo.com',
      password: '$321!pass!123$',
      device_id: 'MC-123',
      })
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });



  it('Signin should return a user_session on successful signin', (done) => {
    router()
      .post('/api/auth/signin')
      .send({
      email: 'demo@demo.com',
      password: '$321!pass!123$',
      device_id: 'MC-123',
      })
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('should return an error message on incorrect sigin credentials', (done) => {
    chai.request(app)
      .post('/api/auth/signin')
      .send({  email: 'de@demo.com',
      password: '1!pass!123$',
      device_id: '1', })
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });

  it('Signin should have three properties: email, password, device_id', (done) => {
    router()
      .post('/api/auth/signin')
      .send({
      email: 'demo@demo.com',
      password: '$321!pass!123$'
      })
      .end((error, response) => {
        expect(response).to.have.status(BAD_REQUEST);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
})

