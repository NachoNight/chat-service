const express = require('express');
const http = require('http');
const { port, environment } = require('./config').server;
const handler = require('./handler');
const initRouter = require('./router');
const database = require('./db');

class Server {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);
    this.init();
  }

  init() {
    console.log('Initializing server...');
    initRouter(this.app);
    handler(this.server);
    database
      .authenticate()
      .then(() => console.log('Connection with the database established.'))
      .catch((err) => this.stop(err));
    database.sync({ logging: false });
  }

  start() {
    this.server.listen(port, (err) => {
      if (err) this.stop(err);
      console.log(
        `Server is running.\nhttp://localhost:${port}/\nEnvironment: ${environment}`,
      );
    });
  }

  stop(err = false) {
    let exitCode = 0;
    if (err) {
      console.error(err);
      exitCode = 1;
    }
    console.log('Server stopped.');
    process.exit(exitCode);
  }
}

module.exports = new Server();
