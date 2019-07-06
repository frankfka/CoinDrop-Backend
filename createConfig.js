const axios = require('axios');
const TOPLIST_URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull';
const {coinDetailsApiKey} = require('./util/config');
const {BackendConfig} = require('./model/backendConfigModel');

const LATEST_CONFIG_VERSION = '1.0.0';

/**
 * Creates config object in mongoose database
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
    await require('./service/databaseService').connect();
}

// Retrieves supported currencies (top 100) from cryptocompare
async function getSupportedCurrencies() {
    let topCurrenciesRes = await axios.get(TOPLIST_URL, {
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