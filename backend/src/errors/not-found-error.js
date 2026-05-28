const AppError = require('./app-error');
const { STATUS_NOT_FOUND, ERROR_NOT_FOUND } = require('../utils/constants');

class NotFoundError extends AppError {
  constructor(message = ERROR_NOT_FOUND) {
    super(message, STATUS_NOT_FOUND);
  }
}

module.exports = NotFoundError;
