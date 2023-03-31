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
import models from "../../../database/models/index";
import app from "../../../index";
import routesRepository from "../repository/routesRepository";
const { routes } = models;

chai.use(chaiHttp);
const router = () => chai.request(app);

describe("Routes Test Cases", () => {
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

  it("Should be able to get Routes", (done) => {
    router()
      .get("/api/routes/get-routes")
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should be able to get a route by id", (done) => {
    router()
      .get("/api/routes/get-route/1")
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should be bring an not found error for get a route by id if id does not exist", (done) => {
   router()
     .get("/api/routes/get-route/999")
     .end((error, response) => {
       expect(response).to.have.status(NOT_FOUND);
       expect(response.body).to.be.a("object");
       expect(response.body.message).to.be.a("string");
       done(error);
     });
 });

  it("Should be able to update a route", (done) => {
    router()
      .put("/api/routes/update-route/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        route_name: "Kibagabaga-Kacyiru",
        start: "Kibagabaga",
        end: "Kacyiru",
        stops: ["KCC", "Rando"],
      })
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should be able to create a route", (done) => {
    router()
      .post("/api/routes/create-routes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        route_name: "Kimironko-Kacyiru",
        start: "Kimironko",
        end: "Kacyiru",
        stops: ["Kimironko Market", "KBC", "KCC"],
      })
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should be able to delete a route", (done) => {
    router()
      .delete("/api/routes/delete-route/1")
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Testing internal server error for deleting non-existent route", (done) => {
    router()
      .delete("/api/routes/delete-route/999")
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(INTERNAL_SERVER_ERROR);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        done(error);
      });
  });

  it("Testing internal server error for getting a non-existent route", (done) => {
    sinon.stub(routesRepository, "getRoute").throws();
    router()
      .get("/api/routes/get-route/999")
      .end((error, response) => {
        expect(response).to.have.status(INTERNAL_SERVER_ERROR);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        done(error);
      });
  });
});
