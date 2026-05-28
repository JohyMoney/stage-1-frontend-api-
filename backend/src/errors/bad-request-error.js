const AppError = require('./app-error');
const { STATUS_BAD_REQUEST, ERROR_INVALID_DATA } = require('../utils/constants');

class BadRequestError extends AppError {
  constructor(message = ERROR_INVALID_DATA) {
    super(message, STATUS_BAD_REQUEST);
  }
}

module.exports = BadRequestError;
