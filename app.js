// Middleware
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const corsModule = require('cors');
const {
  port, blockCors, validateClient,
} = require('./util/configUtil');
const { reqLogger } = require('./util/logUtil');
const { errorHandler } = require('./middleware/errorHandler');

// Routes
const routes = {
  root: '/api',
  profile: '/api/profile',
  coinInfo: '/api/coins',
};

// CORS Middleware
const corsWhitelist = ['https://coindrop.me', 'https://www.coindrop.me'];
const corsOptions = {
  origin(origin, callback) {
    if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  },
};
const cors = blockCors ? corsModule(corsOptions) : corsModule();

// Client Validator
const clientValidator = validateClient ? require('./middleware/clientValidator') : (req, res, next) => {
  next();
};

// Create the App to listen on specified port
const app = express();
app.set('port', port);

// Express Rate Limiter
app.set('trust proxy', 1);
app.use(rateLimiter({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 100, // Limit 100 req/window/IP
}));
// Helmet for basic security checks
app.use(helmet());
// Request Logging
app.use(reqLogger);
// Request body size restriction & parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: 5000 })); // Limit request size to 5kb

// Health check Endpoint
const homeRouter = express.Router();
app.use(routes.root, homeRouter);
homeRouter.get('/', (req, res) => {
  res.send('Connection Established!');
});

// Enable CORS outside of health check endpoint
app.use(cors);

// Payment Profile Endpoint
const { paymentProfileRouter } = require('./routes/paymentProfileRouter');

app.use(routes.profile, clientValidator, paymentProfileRouter);

// Coin Info Endpoint
const { coinInfoRouter } = require('./routes/coinInfoRouter');

app.use(routes.coinInfo, clientValidator, coinInfoRouter);

// Error handling middleware
app.use(errorHandler.errorLogger);
app.use(errorHandler.input);
app.use(errorHandler.generic);

module.exports = { app, routes };
