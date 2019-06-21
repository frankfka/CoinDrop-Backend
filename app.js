
// Dependencies
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const { logEnv, port } = require('./util/config');
const paymentProfileService = require('./service/paymentProfileService');
const { errorHandler } = require('./routes/errorHandler');

const app = express();
app.set('port', port);

app.use(cors());
app.use(logger(logEnv));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Test Endpoint
const homeRouter = express.Router();
app.use('/api', homeRouter);
homeRouter.get('/', (req, res) => {
    res.send("Connection Established")
});

// Payment Profile Endpoint
const paymentProfileRouter = require('./routes/paymentProfileRouter');
app.use('/api/profile', paymentProfileRouter);

// Error handling middleware
app.use(errorHandler);
app.listen(port, () => console.log(`Listening on Port ${port}`));