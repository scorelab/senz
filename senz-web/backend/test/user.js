const mongoose = require("mongoose")
const User = require("../models/user")

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');
const should = chai.should();
chai.use(chaiHttp);

describe('Users', () => {
    before(function() {
        // run and erase the test database
        User.deleteMany({}).then((p) => {
            console.log("Cleared the database")
        }).catch((err) => {
            throw err;
        })
    });

    describe('/POST user', () => {
        it('it should not REGISTER a user because password is not given ', (done) => {
            let user = {
                email: "gargi@gmail.com",
                name: "Gargi"
            }
            chai.request(server)
                .post('/api/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('auth').eql(false);
                    done();
                });
        });
        it('it should REGISTER a user ', (done) => {
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
                    done();
                });
        });
        it('it should LOGIN a user ', (done) => {
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
                    done();
                });
        });

    });

});