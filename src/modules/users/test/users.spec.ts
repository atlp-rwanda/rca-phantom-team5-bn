import chaihttp from "chai-http";
import chai, { expect } from "chai";
import {
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
  OK,
  INTERNAL_SERVER_ERROR,
} from "http-status";
import models from "../../../database/models/index";

import app from "../../../index";
import { hashPassword } from "../../../utils/passwordUtils";

chai.use(chaihttp);
const router = () => chai.request(app);
const { users } = models;

describe("Users test cases", () => {
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

  it("User should be able to get user", (done) => {
    router()
      .get("/api/users/get-user")
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("User should be able to update user given id", (done) => {
    router()
      .put("/api/users/update-profile/1")
      .send({
        fname: "Jane",
        lname: "Doene",
        email: "your-email@gmail.com",
        password: "$321!pass!123$",
      })
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("User should not be able to update user who does not exist", (done) => {
    router()
      .put("/api/users/update-profile/1234567")
      .send({
        fname: "Jane",
        lname: "Doene",
        email: "your-email@gmail.com",
        password: "$321!pass!123$",
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
      .put("/api/users/update-profile/y7)")
      .send({
        fname: "Jane",
        lname: "Doene",
        email: "your-email@gmail.com",
        password: "$321!pass!123$",
      })
      .end((error, response) => {
        expect(response).to.have.status(INTERNAL_SERVER_ERROR);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        done(error);
      });
  });
});
