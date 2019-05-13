const mongoose = require("mongoose")
const Project = require("../models/project")
const Device=require("../models/device")
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');
const should = chai.should();
const decode = require('jwt-decode')
chai.use(chaiHttp);

describe('Projects', () => {
    beforeEach(function() {
        // run and erase the test database
        Project.deleteMany({}).then((p) => {
            console.log("Cleared the database");
        }).catch((err) => {
            throw err;
        })

    });
    describe('/GET device/:id devices', () => {
        it('it should REGISTER, LOGIN and GET all the devices of the project', (done) => {
            let user = {
                email: "gargi@gmail.com",
                name: "Gargi",
                password: 'gargi123'
            }
            chai.request(server)
                .post('/api/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('auth').eql(true);
                    let user = {
                        email: "gargi@gmail.com",
                        password: 'gargi123'
                    }
                    chai.request(server)
                        .post('/api/login')
                        .send(user)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('auth').eql(true);
                            res.body.should.have.property('token');
                            let project = new Project({
                                name: 'TestProject'
                            });
                            project.save((err, project) => {
                                chai.request(server)
                                    .get('/device/' + project.id)
                                    .send(project)
                                    .set('Authorization', res.body.token)
                                    .end((err, res) => {
                                        res.should.have.status(200);
                                        res.body.should.be.an('array');


                                        done();
                                    });
                            });
                        });

                });
        });

    })




});