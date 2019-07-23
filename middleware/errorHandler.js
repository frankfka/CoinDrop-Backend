// Logs error to console
const errorLogger = (err, req, res, next) => {
  console.error(`${err.name}: ${err.message}`);
  return next(err);
};

// Handles database errors
const inputErrorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    // Schema validation failed
    return res.status(400).json({ error: 'Invalid input causing validation error' });
  } if (err.name === 'InputError') {
    // Client validation failed
    return res.status(400).json({ error: 'Client validation failed' });
  }
  return next(err);
};

const genericErrorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-param-reassign
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).json({ error: err.message });
  next(err);
};

// Master error handler object
const errorHandler = {
  errorLogger,
  input: inputErrorHandler,
  generic: genericErrorHandler,
};

module.exports = { errorHandler };
