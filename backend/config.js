require('dotenv').config();

const config = {
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  SECRET: process.env.SECRET,
  PORT: process.env.PORT || 3001,
};
module.exports = config;
