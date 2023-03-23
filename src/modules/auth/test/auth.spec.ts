import chaihttp from 'chai-http';
import chai, { expect } from 'chai';
import { NOT_FOUND, BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } from 'http-status';

import app from '../../../index'

chai.use(chaihttp);
const router = () => chai.request(app);

describe('Authentication test cases', () => {

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


