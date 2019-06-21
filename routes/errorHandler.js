// TODO: Support for promises and chained errors: https://thecodebarbarian.com/80-20-guide-to-express-error-handling

let errorHandler = function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({ error: err.message });
    next(err)
};

let asyncRoute = route => (req, res, next) => {
    Promise.resolve(route(req, res, next)).catch(next)
};

module.exports = {errorHandler, asyncRoute};