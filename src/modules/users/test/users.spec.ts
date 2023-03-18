import chaihttp from 'chai-http';
import chai, { expect } from 'chai';
import { NOT_FOUND, BAD_REQUEST, CREATED, OK } from 'http-status';

import app from '../../../index'

chai.use(chaihttp);
const router = () => chai.request(app);

describe('true or false', () => {
  it('User should be able to get users', (done) => {
    router()
      .get('/api/users/get-users')
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('User should be able to get user', (done) => {
    router()
      .get('/api/users/get-user')
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });
})


