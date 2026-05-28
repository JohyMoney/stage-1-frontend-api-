const dotenv = require('dotenv');

dotenv.config();

const {
  NODE_ENV = 'development',
  PORT = 3000,
  MONGO_URI,
  JWT_SECRET,
  FRONTEND_ORIGIN = 'http://localhost:5173',
} = process.env;

const DEV_MONGO_URI = 'mongodb://127.0.0.1:27017/newsexplorerdb';
const DEV_JWT_SECRET = 'dev-secret-key';

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_URI: NODE_ENV === 'production' ? MONGO_URI : MONGO_URI || DEV_MONGO_URI,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET || DEV_JWT_SECRET,
  FRONTEND_ORIGIN,
};
