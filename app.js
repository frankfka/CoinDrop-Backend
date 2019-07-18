/*
Start the MongoDB connection first. If this fails, exit the process. Otherwise start the server as expected
 */
require('./service/databaseService').connect()
    .then(() => {
        startServer()
    })
    .catch((err) => {
        console.error('Could not connect to MongoDB: ' + err.stack);
        process.exit(1)
    });

// Used to start the server
function startServer() {

    // Middleware
    const express = require('express');
    const logger = require('morgan');
    const cors = require('cors');
    const corsWhitelist = ['https://coindrop.me', 'https://www.coindrop.me'];
    const corsOptions = {
        origin: function (origin, callback) {
            if (corsWhitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Blocked by CORS'))
            }
        }
    };
    const bodyParser = require('body-parser');
    const helmet = require('helmet');
    const rateLimiter = require('express-rate-limit');
    const clientValidator = require('./middleware/clientValidator');

    const {logEnv, port} = require('./util/configUtil');
    const {errorHandler} = require('./middleware/errorHandler');

    const app = express();
    app.set('port', port);
    app.set('trust proxy', 1); // Used with express-rate-limiter

    app.use(rateLimiter({
        windowMs: 10 * 60 * 1000, // 10 min
        max: 100 // Limit 100 req/window/IP
    }));
    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(logger(logEnv));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json({limit: 5000})); // Limit request size to 5kb

    // Health check Endpoint
    const homeRouter = express.Router();
    app.use('/api', homeRouter);
    homeRouter.get('/', (req, res) => {
        res.send("Connection Established!")
    });

    // Payment Profile Endpoint
    const paymentProfileRouter = require('./routes/paymentProfileRouter');
    app.use('/api/profile', clientValidator, paymentProfileRouter);

    // Coin Info Endpoint
    const coinInfoRouter = require('./routes/coinInfoRouter');
    app.use('/api/coins', clientValidator, coinInfoRouter);

    // Error handling middleware
    app.use(errorHandler.errorLogger);
    app.use(errorHandler.input);
    app.use(errorHandler.generic);
    app.listen(port, () => console.log(`Listening on Port ${port}`));
}
