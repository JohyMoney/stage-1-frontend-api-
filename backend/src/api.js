const { NODE_ENV } = require('./utils/config');

const API_BASE_URL = NODE_ENV === 'production'
  ? 'https://api.example.com'
  : 'http://localhost:3000';

module.exports = API_BASE_URL;
