// Load .env
require('dotenv').config();

module.exports = {
  server: {
    port: process.env.PORT || 8000,
    environment: process.env.NODE_ENV || 'development',
  },
  database: {
    name: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres',
    port: process.env.DB_PORT || 5432,
  },
};
