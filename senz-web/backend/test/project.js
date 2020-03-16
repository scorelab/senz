const Project = require("../models/project");
const Device = require("../models/device");
const User = require("../models/user");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../main");
const should = chai.should();
const decode = require("jwt-decode");
chai.use(chaiHttp);

describe("Projects", () => {
  const mockUser = {
    name: "test",
    email: "test@test.com",
    password: "test"
  };
  let token;
  let user;
  let projectId;
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
    Project.deleteMany({});
    Device.deleteMany({});
    User.deleteMany({});
  });
  // clears the mockDatabase after tests in this module are complete
  after(async () => {
    await Project.deleteMany({});
    await Device.deleteMany({});
    await User.deleteMany({});
  });
  it("Should GET all the projects of a user GET /project/:userid/all", done => {
    chai
      .request(server)
      .get(`/project/${user.id}/all`)
      .set("Authorization", token)
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
  it("Should NOT GET all the projects as token not given", done => {
    chai
      .request(server)
      .get(`/project/${user.id}/all`)
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(403);
        res.body.should.be.a("object");
        res.body.should.have.property("auth").eql(false);
        res.body.should.have.property("message").eql("No token provided.");
        done();
      });
  });
  it("Should POST a project for a particular user", done => {
    const mockProject = {
      name: "test",
      description: "test"
    };
    chai
      .request(server)
      .post(`/project/${user.id}/new`)
      .set("Authorization", token)
      .send(mockProject)
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.have.property("name").eql(mockProject.name);
        res.body.should.have
          .property("description")
          .eql(mockProject.description);
        projectId = res.body._id;
        done();
      });
  });
  it("Should not POST a project with existing name for a particular user", done => {
    const mockProject = {
      name: "test",
      description: "test"
    };
    chai
      .request(server)
      .post(`/project/${user.id}/new`)
      .set("Authorization", token)
      .send(mockProject)
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(409);
        res.body.should.be.a("object");
        done();
      });
  });
  it("Should add a device to the project", done => {
    const mockDevice = {
      name: "testDevice",
      pubkey: "testkey"
    };
    Device.create(mockDevice).then(createdDevice => {
      chai
        .request(server)
        .post(`/project/${projectId}/deviceAdd`)
        .send(mockDevice)
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("object");
          done();
        });
    });
  });
  it("Should DELETE the a project of a particular user", done => {
    chai
      .request(server)
      .delete(`/project/${user.id}/delete/${projectId}`)
      .set("Authorization", token)
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("name");
        done();
      });
  });
});
