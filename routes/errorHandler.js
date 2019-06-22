// Logs error to console
let errorLogger = function (err, req, res, next) {
    console.error(`${err.name}: ${err.message}`);
    next(err)
};

// Handles database errors
let mongooseErrorHandler = function (err, req, res, next) {
    if (err.name === 'ValidationError') {
        // Schema validation failed
        err.statusCode = 400;
        res.status(err.statusCode).json({ error: `Invalid input: ${err.message}` })
    } else if (err.name === 'MongoError') {
        // Another unrelated database error
        err.statusCode = 500;
        res.status(err.statusCode).json({ error: `MongoDB error: ${err.message}` })
    } else {
        next(err)
    }
};

let genericErrorHandler = function (err, req, res, next) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({ error: err.message });
    next(err)
};

// Wraps an async function route
let asyncRoute = route => (req, res, next) => {
    Promise.resolve(route(req, res, next)).catch(next)
};

// Master error handler object
let errorHandler = {
    logger: errorLogger,
    mongoose: mongooseErrorHandler,
    generic: genericErrorHandler
};

module.exports = { errorHandler, asyncRoute };