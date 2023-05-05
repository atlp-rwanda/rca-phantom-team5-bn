import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { NOT_FOUND, CREATED, OK, CONFLICT, INTERNAL_SERVER_ERROR } from "http-status";
import app from "../../../index";

chai.use(chaiHttp);
const router = () => chai.request(app);

describe("Buses Test Cases", () => {
  let token = "";

  beforeEach((done) => {
    router()
      .post("/api/auth/signin")
      .send({
        email: "jane@demo.com",
        password: "jane!123$",
        device_id: "MC-123",
      })
      .end((error, response) => {
        token = response.body.data.access_token;
        done(error);
      });
  });

  it("Should be able to get Buses", (done) => {
    router()
      .get("/api/buses/get-buses")
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should be able to get Buses by driver", (done) => {
    router()
      .get("/api/buses/get-bus-by-driver/1")
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should get an error when getting Buses by driver who doens't exist", (done) => {
    router()
      .get("/api/buses/get-bus-by-driver/999")
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Internal server error when getting Buses by driver who doens't exist", (done) => {
    router()
      .get("/api/buses/get-bus-by-driver/(*:97skhdfa")
      .end((error, response) => {
        expect(response).to.have.status(INTERNAL_SERVER_ERROR);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Should be able to get Buses on a given route", (done) => {
    router()
      .get("/api/buses/get-buses?router_id=1")
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Internal server error on invalid query to get Buses on a given route", (done) => {
    router()
      .get("/api/buses/get-buses?router_id=(*:97skhdfa")
      .end((error, response) => {
        expect(response).to.have.status(INTERNAL_SERVER_ERROR);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Should be able to get a bus by id", (done) => {
    router()
      .get("/api/buses/get-bus/1")
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should be bring an not found error for get a bus by id if id does not exist", (done) => {
    router()
      .get("/api/buses/get-bus/999")
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Should be able to update a bus", (done) => {
    router()
      .put("/api/buses/update-bus/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        plate_number: "RAC123D",
        name: "Toyota Corolla",
        model: "XLi",
        route_id: 2,
        available_sits: 5
      })
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should be able to get a buses in the routes by origin and destination", (done) => {
    router()
      .get("/api/buses/get-buses/2/5")
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should be bring an not found error when there is no bus assigned to the routes specified by origin and destination", (done) => {
    router()
      .get("/api/buses/get-buses/1/33")
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Should get an error for updating a bus with an id wich doesn't exist", (done) => {
    router()
      .put("/api/buses/update-bus/999")
      .set("Authorization", `Bearer ${token}`)
      .send({
        plate_number: "RAC123D",
        name: "Toyota Corolla",
        model: "XLi",
        available_sits: 5
      })
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Should be able to assign a bus to a user", (done) => {
    router()
      .post("/api/buses/assign-bus")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bus_id: 1,
        driver_id: 1
      })
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should get an error for a bus which is already assigned", (done) => {
    router()
      .post("/api/buses/assign-bus")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bus_id: 1,
        driver_id: 2
      })
      .end((error, response) => {
        expect(response).to.have.status(CONFLICT);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Should get an error for assigning a bus to a user who is already assigned", (done) => {
    router()
      .post("/api/buses/assign-bus")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bus_id: 2,
        driver_id: 1
      })
      .end((error, response) => {
        expect(response).to.have.status(CONFLICT);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Should get an error for assigning a bus which doesn't exist", (done) => {
    router()
      .post("/api/buses/assign-bus")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bus_id: 12,
        driver_id: 1
      })
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it('Create a bus successfully', (done) => {
    router()
      .post('/api/buses/create-bus')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "Toyota Corolla",
        available_sits: 5,
        model: "XLi",
        plate_number: "ABC-1234"
      })
      .end((error, response) => {
        expect(response).to.have.status(CREATED);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('Should get an error for create a bus where plate number already exist', (done) => {
    router()
      .post('/api/buses/create-bus')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "Toyota Corolla",
        available_sits: 5,
        model: "XLi",
        plate_number: "ABC-1234"
      })
      .end((error, response) => {
        expect(response).to.have.status(CONFLICT);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
  it("Should be able to delete a bus", (done) => {
    router()
      .delete("/api/buses/delete-bus/3")
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Testing error for deleting non-existent bus", (done) => {
    router()
      .delete("/api/buses/delete-bus/999")
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        done(error);
      });
  });

  it("Testing internal server error for deleting non-existent bus", (done) => {
    router()
      .delete("/api/buses/delete-bus/345YRTY(")
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(INTERNAL_SERVER_ERROR);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        done(error);
      });
  });

  it("Not found error for getting a non-existent bus", (done) => {
    router()
      .get("/api/buses/get-bus/999")
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        done(error);
      });
  });

  it("Testing internal server error for getting a non-existent bus", (done) => {
    router()
      .get("/api/buses/get-bus/345YRTY(")
      .end((error, response) => {
        expect(response).to.have.status(INTERNAL_SERVER_ERROR);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        done(error);
      });
  });
});
