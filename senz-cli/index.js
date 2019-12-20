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
  console.log(
      chalk.yellow(
          figlet.textSync('senz CLI', {horizontalLayout: 'full'}),
      ),
  );
  clear();

  // Initial information
  const {queryType} = await inquirer.getQueryType();
  const {socketPort, socketAddress} = await inquirer.getSocketInfo();
  // Get query
  const {shareQuery} = await inquirer.getQueryContent();

  // Socket creation and connection
  const socket = await createSocket(socketPort, socketAddress);

  if (queryType === 'sendQuery') {
    senz.query.sendQuery(socket, shareQuery).then((res) => {
      console.log(chalk.bgGreen('Response Received'));
      console.log(chalk.bgWhite(res));
    });
  } else if (queryType === 'recResponse') {
    senz.query.recResponse(socket).then((res) => {
      console.log(chalk.bgGreen('Response Received'));
      console.log(chalk.bgWhite(res));
    });
  } else {
    console.log(chalk.bgRed(res));
  }

  console.log(queryType, socketPort, socketAddress);
};

run();
