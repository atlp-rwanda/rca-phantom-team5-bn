import chaihttp from 'chai-http';
import chai, { expect } from 'chai';
import { NOT_FOUND, BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR, CONFLICT, UNAUTHORIZED } from 'http-status';

import app from '../../../index'

chai.use(chaihttp);
const router = () => chai.request(app);



describe('Authentication test cases', () => {
//  sign in
let access_token: string;
it('Signin should return a user_session on successful signin', (done) => {
  router()
    .post('/api/auth/signin')
    .send({
    email: 'peter@demo.com',
    password: 'peter!123$',
    device_id: 'MC-123',
    })
    .end((error, response) => {
      access_token = response.body.data.access_token
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

// register user
  it('register operater does not require driver_licence (BAD_REQUEST)', (done) => {
    router()
      .post('/api/auth/register-user')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        role: 'operator',
        fname: 'dad',
        lname: 'diane',
        driver_licence: ["C"],
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
      .set('Authorization', `Bearer ${access_token}`)
      .send({
       role: 'operator',
       fname: 'Jane',
       lname: 'Doene',
       nid: '8967988947289789',
       email:'jane@demo.com',   
      })
      .end((error, response) => {
        expect(response).to.have.status(CONFLICT);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });

  it('register user National ID exist (bad request)', (done) => {
    router()
      .post('/api/auth/register-user')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        role: 'operator',
        fname: 'dad',
        lname: 'diane',
        nid: '1967988947289789',
        email:'dad@demo.com',
      })
      .end((error, response) => {
        expect(response).to.have.status(CONFLICT);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });

  it('register operator success', (done) => {
    router()
      .post('/api/auth/register-user')
      .set('Authorization', `Bearer ${access_token}`)
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
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        role: 'driver',
        fname: 'aad',
        lname: 'aiane',
        driver_licence:["A"],
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


  // reset password 
  it('Reset password success', (done) => {
    router()
      .put(`/api/auth/reset-password/${access_token}`)
      .send({       
        password:"peter!123$"       
      })
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  }); 
  
  //logout

  it('logout success', (done) => {
    router()
      .delete('/api/auth/logout')
      .set('Authorization', `Bearer ${access_token}`)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });





  it('logout should return an error message on incorrect token', (done) => {
    router()
      .delete('/api/auth/logout')
      .set('Authorization', `Bearer ${access_token}`)
      .end((error, response) => {
        expect(response).to.have.status(UNAUTHORIZED);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
  
})


