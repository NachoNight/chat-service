const express = require('express');
const { port, environment } = require('./config').server;
const initRouter = require('./router');

class Server {
  constructor() {
    this.app = express();
    this.init();
  }

  init() {
    console.log('Initializing server...');
    initRouter(this.app);
  }

  start() {
    this.app.listen(port, (err) => {
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
