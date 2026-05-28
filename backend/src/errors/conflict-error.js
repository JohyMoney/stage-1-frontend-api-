const AppError = require('./app-error');
const { STATUS_CONFLICT, ERROR_CONFLICT } = require('../utils/constants');

class ConflictError extends AppError {
  constructor(message = ERROR_CONFLICT) {
    super(message, STATUS_CONFLICT);
  }
}

module.exports = ConflictError;
