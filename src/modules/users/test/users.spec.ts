import chaihttp from "chai-http";
import chai, { expect } from "chai";
import {NOT_FOUND, OK, UNAUTHORIZED } from "http-status";

import app from "../../../index";

chai.use(chaihttp);
const router = () => chai.request(app);

describe("Users test cases", () => {
    let token = '';
    let adminToken = '';

    beforeEach((done) => {
      router()
        .post("/api/auth/signin")
        .send({
          email: "demo@demo.com",
          password: "$321!pass!123$",
          device_id:"MC-123"
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

  it("User who is not admin should be unauthorized", (done) => {
    router()
      .get("/api/admins/get-user/2")
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

  it("User should be able to update user as long as he is logged in", (done) => {
    router()
      .put("/api/users/update-profile")
      .set('Authorization', `Bearer ${token}`)
      .send({
        fname: "Jane",
        lname: "Doene",
        driver_licence:["A"]
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
      .get("/api/admins/get-user/2")
      .set('Authorization', `Bearer ${adminToken}`)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("User who is admin should get error for users by id who does not exist", (done) => {
    router()
      .get("/api/admins/get-user/999")
      .set('Authorization', `Bearer ${adminToken}`)
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });
});
