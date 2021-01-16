const { Pool } = require('pg');
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = require('./config');

const client = new Pool({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
});

module.exports = client;
