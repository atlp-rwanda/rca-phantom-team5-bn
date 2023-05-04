import chaihttp from "chai-http";
import chai, { expect } from "chai";
import {INTERNAL_SERVER_ERROR, NOT_FOUND, OK, UNAUTHORIZED } from "http-status";

import app from "../../../index";

chai.use(chaihttp);
const router = () => chai.request(app)

describe("Users test cases", () => {
    let token = '';
    let adminToken = '';

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
  
  it("User should be able to get users", (done) => {
    router()
      .get("/api/users/get-users")
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("User should be able to get users who are drivers", (done) => {
    router()
      .get("/api/users/get-drivers?limit=3&page=3&is_assigned=false")
      .set('Authorization', `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("User who is not admin should be unauthorized", (done) => {
    router()
      .get("/api/users/get-user/2")
      .set('Authorization', `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(UNAUTHORIZED);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("User should be able to get user as long as he is logged in", (done) => {
    router()
      .get("/api/users/get-profile")
      .set('Authorization', `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("User should be able to update user as long as logged in", (done) => {
    router()
      .put("/api/users/update-profile")
      .set('Authorization', `Bearer ${token}`)
      .send({
        fname: "Jane",
        lname: "Doene"
      })
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  before((done) => {
    router()
      .post("/api/auth/signin")
      .send({
        email: "peter@demo.com",
        password: "peter!123$",
        device_id:"MC-123"
      })
      .end((error, response) => {
        adminToken = response.body.data.access_token;
        done(error);
      });
  });

  it("User who is admin should be able to get users by id", (done) => {
    router()
      .get("/api/users/get-user/2")
      .set('Authorization', `Bearer ${adminToken}`)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("User should to get error on get user who doesn't exist", (done) => {
    router()
      .get("/api/users/get-user/999")
      .set('Authorization', `Bearer ${adminToken}`)
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });
  it("Testing error for admin can not delete super admin or admin", (done) => {
    router()
      .delete("/api/users/delete-user/4")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        done(error);
      });
  });

  it("Testing error for deleting non-existent bus", (done) => {
    router()
      .delete("/api/users/delete-user/999")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        done(error);
      });
  });

  it("Testing internal server error for deleting non-existent bus", (done) => {
    router()
      .delete("/api/users/delete-user/345YRTY(")
      .set("Authorization", `Bearer ${adminToken}`)
      .end((error, response) => {
        expect(response).to.have.status(INTERNAL_SERVER_ERROR);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        done(error);
      });
  });


});
