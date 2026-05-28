const AppError = require('./app-error');
const { STATUS_FORBIDDEN, ERROR_FORBIDDEN } = require('../utils/constants');

class ForbiddenError extends AppError {
  constructor(message = ERROR_FORBIDDEN) {
    super(message, STATUS_FORBIDDEN);
  }
}

module.exports = ForbiddenError;
