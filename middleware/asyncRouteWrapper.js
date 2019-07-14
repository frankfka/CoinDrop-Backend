
// Wraps an async function route
let asyncRoute = route => (req, res, next) => {
    Promise.resolve(route(req, res, next)).catch(next)
};

module.exports = {asyncRoute};