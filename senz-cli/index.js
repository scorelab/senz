const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const senz = require('senz');
const net = require('net');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');

const createSocket = async (socketPort, socketAddress) => {
  try {
    const socket = new net.Socket();
    socket.connect(socketPort, socketAddress, () => {
      console.log(chalk.bgGreen(`Socket successfully created on port ${socketPort}`));
    });
    return socket;
  } catch (exception) {
    console.log(chalk.bgRed(exception));
    return {message: 'Socket creation failed'};
  }
};

const run = async () => {

  clear();

  console.log(
      chalk.yellow(
          figlet.textSync('senz CLI', {horizontalLayout: 'full'}),
      ),
  );

  // Initial information
  const {queryType} = await inquirer.getQueryType();
  const {socketPort, socketAddress} = await inquirer.getSocketInfo();
  

  // Socket creation and connection
  const socket = await createSocket(socketPort, socketAddress);

  if (queryType === 'sendQuery') {
    // Get query
    const {shareQuery} = await inquirer.getQueryContent();

    // Send Query
    console.log(`Sending ${queryType} to ${socketAddress}:${socketPort}`);

    senz.query.sendQuery(socket, shareQuery).then((res) => {
      console.log(chalk.bgGreen(chalk.black('Query Sent')));
      console.log(chalk.bgWhite(chalk.black(res)));
    });
  } else if (queryType === 'recResponse') {
    console.log(`Awaiting ${queryType} to ${socketAddress}:${socketPort}`);

    senz.query.recResponse(socket).then((res) => {
      console.log(chalk.bgGreen('Response Received'));
      console.log(chalk.bgWhite(chalk.black(res)));
    });
  } else {
    console.log(chalk.bgRed(res));
  }
};

run();
