const { resolve } = require('path');
const { environment } = require('./config').server;

module.exports = (app) => {
  app.get('/', (_, res) => res.send('NachoNight Chat Service'));
  if (environment === 'development')
    app.get('/test', (_, res) =>
      res.sendFile(resolve(__dirname, './test-client/index.html')),
    );
};
