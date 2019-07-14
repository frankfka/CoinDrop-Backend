// Logs error to console
let errorLogger = function (err, req, res, next) {
    console.error(`${err.name}: ${err.message}`);
    next(err)
};

// Handles database errors
let inputErrorHandler = function (err, req, res, next) {
    if (err.name === 'ValidationError') {
        // Schema validation failed
        return res.status(400).json({error: 'Invalid input causing validation error'})
    } else if (err.name === 'InputError') {
        // Client validation failed
        return res.status(400).json({error: 'Client validation failed'})
    } else {
        next(err)
    }
};

let genericErrorHandler = function (err, req, res, next) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({error: err.message});
    next(err)
};

// Master error handler object
let errorHandler = {
    errorLogger: errorLogger,
    input: inputErrorHandler,
    generic: genericErrorHandler
};

module.exports = {errorHandler};