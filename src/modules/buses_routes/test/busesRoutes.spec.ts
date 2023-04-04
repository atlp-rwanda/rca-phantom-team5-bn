import chai, { expect } from "chai";
import sinon from "sinon";
import chaiHttp from "chai-http";
import {
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
  OK,
  INTERNAL_SERVER_ERROR,
} from "http-status";
import app from "../../../index";
import BusesRoutesRepository from "../repository/busesRoutesRepository";

chai.use(chaiHttp);
const router = () => chai.request(app);

describe("Buses assignment to routes Test Cases", () => {
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

  it("Should be able to get all buses that are assigned to route", (done) => {
    router()
      .get("/api/busesRoutes/assigned-bus")
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should be able to create an assignment from bus to route", (done) => {
    router()
      .post("/api/busesRoutes/assign-bus")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bus_id:2,
        route_id: 2
      })
      .end((error, response) => {
        expect(response).to.have.status(CREATED);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should be able to get an error for assigning an already assigned bus", (done) => {
    router()
      .post("/api/busesRoutes/assign-bus")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bus_id:2,
        route_id: 3
      })
      .end((error, response) => {
        expect(response).to.have.status(BAD_REQUEST);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Should be able to get an error for none-existing bus or route id for assignment creation", (done) => {
    router()
      .post("/api/busesRoutes/assign-bus")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bus_id:999,
        route_id: 999
      })
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Should be able to change the route of a bus", (done) => {
    router()
      .put("/api/busesRoutes/change-bus-route")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bus_id:2,
        route_id: 2
      })
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should be able to get an error for changing a bus route which has never been assigned before", (done) => {
    router()
      .put("/api/busesRoutes/change-bus-route")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bus_id:3,
        route_id: 2
      })
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Should be able to get an error for changing a bus or route which does not exist", (done) => {
    router()
      .put("/api/busesRoutes/change-bus-route")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bus_id:999,
        route_id: 999
      })
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });
  
});
