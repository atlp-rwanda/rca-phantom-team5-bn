import chaihttp from "chai-http";
import chai, { expect } from "chai";
import { NOT_FOUND,BAD_REQUEST,CREATED,OK,INTERNAL_SERVER_ERROR,} from "http-status";
import models from "../../../database/models/index";

import app from "../../../index";

chai.use(chaihttp);
const router = () => chai.request(app);
const { buses } = models;

describe("Buses test cases", () => {
  it("Should be able to get buses", (done) => {
    router()
      .get("/api/buses/buses")
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  
  it("Should be able to get a bus", (done) => {
    router()
      .get("/api/buses/bus/1")
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should be able to update bus given id", (done) => {
    router()
      .put("/api/buses/update/1")
      .send({
        name: 'Toyota Corolla',
        available_sits: 5,
        model: 'XLi',
        plate_number: 'ABC-123',
        agencyId:1
      })
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });



  it("Should not be able to update bus which does not exist", (done) => {
    router()
      .put("/api/buses/update/1234567")
      .send({
          name: 'Range Rovers',
          available_sits: 5,
          model: 'XL',
          plate_number: 'ABC-123',
          agencyId:1
      })
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        done(error);
      });
  });


  it("Testing internal server error", (done) => {
    router()
      .put("/api/buses/update/zt7)")
      .send({
        name: 'Toyota Corolla',
        available_sits: 5,
        model: 'XLi',
        plate_number: 'ABC-123',
        agencyId:1
      })
      .end((error, response) => {
        expect(response).to.have.status(INTERNAL_SERVER_ERROR);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        done(error);
      });
  });



  it('Should be able to create Bus successful', (done) => {
    router()
      .post('/api/buses/create')
      .send({
        name: 'Toyota Corolla',
        available_sits: 5,
        model: 'XLi',
        plate_number: 'ABC-123',
        agencyId:1
      })
      .end((error, response) => {
        expect(response).to.have.status(CREATED);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });


  it('should delete a bus with given id', (done) => {
    router()
      .delete("/api/buses/delete/1")
      .end((err, res) => {
        expect(res).to.have.status(OK);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.be.a('string');
        expect(res.body).to.have.property('data');
        done(err);
      });
  });

});