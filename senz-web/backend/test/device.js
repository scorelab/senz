const Project = require("../models/project");
const Device = require("../models/device");
const User = require("../models/user");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../main");
const should = chai.should();
const decode = require("jwt-decode");
chai.use(chaiHttp);

describe("Devices", () => {
  const mockUser = {
    name: "test",
    email: "test@test.com",
    password: "test"
  };
  const mockDevice = {
    name: "testDevice",
    pubkey: "testkey"
  };
  let token;
  let user;
  before(done => {
    chai
      .request(server)
      .post("/api/register")
      .send(mockUser)
      .end((err, res) => {
        if (err) throw err;
        token = res.body.token;
        user = decode(res.body.token);
        done();
      });
    User.deleteMany({});
    Project.deleteMany({});
    Device.deleteMany({});
  });
  // clears the mockDatabase after tests in this module are complete
  after(async () => {
    await Project.deleteMany({});
    await Device.deleteMany({});
    await User.deleteMany({});
  });
  it("Should POST a new device", done => {
    chai
      .request(server)
      .post(`/device/${user.id}/new`)
      .set("Authorization", token)
      .send(mockDevice)
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it("Should not POST a new device with existing key", done => {
    chai
      .request(server)
      .post(`/device/${user.id}/new`)
      .set("Authorization", token)
      .send(mockDevice)
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(409);
        res.body.should.be.a("object");
        done();
      });
  });
  it("Should GET all devices of a particular user", done => {
    chai
      .request(server)
      .get(`/device/${user.id}/all`)
      .set("Authorization", token)
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});
