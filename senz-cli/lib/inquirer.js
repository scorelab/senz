const inquirer = require('inquirer');

const files = require('./files');

module.exports = {
  getQueryType: () => {
    const questions = [
      {
        name: 'queryType',
        type: 'list',
        message: 'Please select the type of query:',
        choices: ['sendQuery', 'recResponse'],
        validate: function( value ) {
          if (value) {
            return true;
          } else {
            return 'Please make a choice';
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
  getSocketInfo: () => {
    const questions = [
      {
        name: 'socketPort',
        type: 'input',
        message: 'Please enter the socket port:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a valid value.';
          }
        },
      },
      {
        name: 'socketAddress',
        type: 'input',
        message: 'Please enter the socket address:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a valid value.';
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
  getQueryContent: () => {
    const questions = [
      {
        name: 'shareQuery',
        type: 'input',
        message: 'Please enter the query:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a valid value.';
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
};
