const mongoose = require("mongoose")
const Project = require("../models/project")
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
            console.log("Cleared the database")
        }).catch((err) => {
            throw err;
        })

    });
    describe('/GET device/:id devices', () => {
        it('it should not GET all the devices of a project because token is not given', (done) => {
            let project = new Project({
                name: 'Project1'
            });
            project.save((err, project) => {
                chai.request(server)
                    .get('/device/' + project.id)
                    .send(project)
                    .end((err, res) => {
                        res.should.have.status(403);
                        res.body.should.be.a('object');
                        res.body.should.have.property('auth').eql(false);
                        res.body.should.have.property('message').eql('No token provided.');

                        done();
                    });
            });
        })


    })

    describe('/POST project/:userId/new projects', () => {
        it('it should LOGIN and POST a project', (done) => {

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
                    var userObj = decode(res.body.token)
                    let project = {
                        name: 'TestProject'
                    };

                    chai.request(server)
                        .post('/project/' + userObj.id + '/new')
                        .send(project)
                        .set('Authorization', res.body.token)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('name').eql('TestProject');


                            done();
                        });

                });


        });

    })



});