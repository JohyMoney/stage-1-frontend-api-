const {
  STATUS_SERVER_ERROR,
  ERROR_SERVER,
} = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || STATUS_SERVER_ERROR;
  const message = statusCode === STATUS_SERVER_ERROR ? ERROR_SERVER : err.message;
  res.status(statusCode).send({ message });
  next();
};
