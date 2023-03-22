import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import exp from "constants";
import { NOT_FOUND, BAD_REQUEST, CREATED, OK } from 'http-status';
import app from "../../../index";

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
    

})