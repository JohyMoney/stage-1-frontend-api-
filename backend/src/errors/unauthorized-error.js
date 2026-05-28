const AppError = require('./app-error');
const { STATUS_UNAUTHORIZED, ERROR_UNAUTHORIZED } = require('../utils/constants');

class UnauthorizedError extends AppError {
  constructor(message = ERROR_UNAUTHORIZED) {
    super(message, STATUS_UNAUTHORIZED);
  }
}

module.exports = UnauthorizedError;
