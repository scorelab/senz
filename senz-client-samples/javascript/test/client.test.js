process.env.NODE_ENV = 'test';

const chai = require('chai');
const client = require('../client.js');
const net = require('net');


//to use expect
const expect = chai.expect;

describe('testing client.js', () => {
  const server = net.createServer();

  describe('sendMessage() and receiveMessage()', () => {



  before(() => {
    server.on('connection', function(socket) {
      console.log('Server: connected to client');
      socket.write("DATA ok success : ")
      socket.on('data', function(data) {
        socket.write('received');
      })
    })
        server.listen(2552, '127.0.0.1');

});

    it('should send message successfully', (done) => {

        let msg = "foo";
        client.sendMessage(msg)
        .then((data) => {
            expect(data).to.be.string;
            expect(data).to.equal('DATA ok success : received');
        });
        done();
    })

    it('should receive data successfully', () => {

      let msg = "success";
      client.receiveMessage()
      .then((data) => {
        expect(data).to.be.string;
        expect(data).to.equal(msg);
      })
    })
  })


})
