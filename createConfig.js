
// Set these before running
const environment = 'production'; // Either production or development - development is default
const LATEST_CONFIG_VERSION = '1.0.0';

// Dependencies
const axios = require('axios');
const mongoose = require('mongoose');

// Setup
const envFile = require('path').resolve(process.cwd(), environment === 'production' ? '.env.production' : '.env');
const dotenv = require('dotenv');
const logger = require('./util/logUtil');
const { BackendConfig } = require('./model/backendConfigModel');

dotenv.config({ path: envFile });

// Environment specific
const coinDetailsApiKey = process.env.COIN_DETAILS_API_KEY;
const topListUrl = 'https://min-api.cryptocompare.com/data/top/mktcapfull';
const databaseUri = process.env.DATABASE_URI;

/*
Helper Functions
 */
async function startDatabase() {
  await mongoose.connect(databaseUri, {
    useNewUrlParser: true,
  });
}

// Retrieves supported currencies (top 100) from cryptocompare
async function getSupportedCurrencies() {
  const topCurrenciesRes = await axios.get(topListUrl, {
    params: {
      limit: 100, // Top n to get
      tsym: 'USD', // Conversion-to
      api_key: coinDetailsApiKey,
    },
  });
  return topCurrenciesRes.data.Data.map(currency => currency.CoinInfo.Name);
}

// Does creation and saving of config
async function createConfig() {
  await startDatabase();
  const supportedCurrencies = await getSupportedCurrencies();

  const config = new BackendConfig({
    supportedCurrencies,
    dateCreated: Date(),
    version: LATEST_CONFIG_VERSION,
  });
  return config.save();
}

/**
 * Creates config object in input database
 *
 * TODO: Copy previous config properties over
 */
createConfig()
  .then((result) => {
    logger.info(result);
    process.exit(0);
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
