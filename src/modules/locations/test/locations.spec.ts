import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { NOT_FOUND, CREATED, OK } from "http-status";
import app from "../../../index";

chai.use(chaiHttp);
const router = () => chai.request(app);

describe("Locations Test Cases", () => {
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

  it("Should be able to get Locations", (done) => {
    router()
      .get("/api/locations/get-locations")
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should be able to get Locations with limits", (done) => {
    router()
      .get("/api/locations/get-locations?limit=10&page=1")
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should be able to get a location by id", (done) => {
    router()
      .get("/api/locations/get-location/1")
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it("Should be bring an not found error for get a location by id if id does not exist", (done) => {
   router()
     .get("/api/locations/get-location/999")
     .end((error, response) => {
       expect(response).to.have.status(NOT_FOUND);
       expect(response.body).to.be.a("object");
       expect(response.body.message).to.be.a("string");
       done(error);
     });
 });

  it("Should be able to update a location", (done) => {
    router()
      .put("/api/locations/update-location/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        location_name:"Gatete"
      })
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        expect(response.body).to.have.property("data");
        done(error);
      });
  });

  it('Create a location successfully', (done) => {
    router()
      .post('/api/locations/create-location')
      .set('Authorization', `Bearer ${token}`)
      .send({
        location_name: "Gatenga",
        latitude: "-2.61833",
        longitude: "29.6294"
      })
      .end((error, response) => {
        expect(response).to.have.status(CREATED);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it("Should be able to delete a locations", (done) => {
    router()
      .delete("/api/locations/delete-location/3")
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.a("string");
        done(error);
      });
  });

  it("Testing internal server error for deleting non-existent location", (done) => {
    router()
      .delete("/api/locations/delete-location/999")
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        done(error);
      });
  });

  it("Testing internal server error for getting a non-existent location", (done) => {
    router()
      .get("/api/locations/get-location/999")
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        done(error);
      });
  });

  it("Testing internal server error for updating a non-existent location", (done) => {
    router()
      .put("/api/locations/update-location/999")
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a("object");
        expect(response.body.message).to.be.an("string");
        done(error);
      });
  });
});
