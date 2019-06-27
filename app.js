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

app.use(cors()); // TODO: configure cors security
app.use(helmet());
app.use(logger(logEnv));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: 5000})); // Limit request size to 5kb

// Test Endpoint
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