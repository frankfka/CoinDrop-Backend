
// Set these before running
const environment = 'production'; // Either production or development - development is default
const LATEST_CONFIG_VERSION = '1.0.0';

// Dependencies
const axios = require('axios');
const {BackendConfig} = require('./model/backendConfigModel');
const mongoose = require('mongoose');

// Setup
const envFile = require('path').resolve(process.cwd(), environment === 'production' ? '.env.production' : '.env');
const dotenv = require('dotenv');
dotenv.config({path: envFile});

// Environment specific
const coinDetailsApiKey = process.env.COIN_DETAILS_API_KEY;
const topListUrl = 'https://min-api.cryptocompare.com/data/top/mktcapfull';
const databaseUri = process.env.DATABASE_URI;

/**
 * Creates config object in input database
 *
 * TODO: Copy previous config properties over
 */
createConfig()
    .then((result) => {
        console.log(result);
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

/*
Helper Functions
 */
async function startDatabase() {
    await mongoose.connect(databaseUri, {
        useNewUrlParser: true
    });
}

// Retrieves supported currencies (top 100) from cryptocompare
async function getSupportedCurrencies() {
    let topCurrenciesRes = await axios.get(topListUrl, {
        params: {
            limit: 100, // Top n to get
            tsym: "USD", // Conversion-to
            api_key: coinDetailsApiKey
        }
    });
    return topCurrenciesRes.data['Data'].map((currency) => {
        return currency['CoinInfo']['Name'];
    });
}

// Does creation and saving of config
async function createConfig() {
    await startDatabase();
    let supportedCurrencies = await getSupportedCurrencies();

    let config = new BackendConfig({
        supportedCurrencies: supportedCurrencies,
        dateCreated: Date(),
        version: LATEST_CONFIG_VERSION
    });
    return await config.save();
}