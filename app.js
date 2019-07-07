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
    // Dependencies
    const express = require('express');
    const logger = require('morgan');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const helmet = require('helmet');

    const { logEnv, port } = require('./util/config');
    const { errorHandler } = require('./routes/errorHandler');

    const app = express();
    app.set('port', port);

    app.use(cors());
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
    app.use('/api/profile', paymentProfileRouter);

    // Coin Info Endpoint
    const coinInfoRouter = require('./routes/coinInfoRouter');
    app.use('/api/coins', coinInfoRouter);

    // Error handling middleware
    app.use(errorHandler.logger);
    app.use(errorHandler.mongoose);
    app.use(errorHandler.generic);
    app.listen(port, () => console.log(`Listening on Port ${port}`));
}
