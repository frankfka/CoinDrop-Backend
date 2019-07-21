
const {configVersion} = require('../util/configUtil');
const {BackendConfig} = require('../model/backendConfigModel');
const ReadPreference = require('mongodb').ReadPreference;
const cacheService = require('./cacheService');
const ccApiService = require('./ccApiService');

/**
 * Retrieves a list of valid currencies
 */
async function getSupportedCurrencies() {
    let config = await BackendConfig.findOne({version: configVersion})
        .read(ReadPreference.NEAREST)
        .exec();
    return config.supportedCurrencies;
}

/**
 * Retrieves coin details from either an API or the cache
 *
 * Expects an array of ticker ID's | Returns an array of coinInfo objects
 * Will also put newly retrieved items into the cache
 */
async function getCoinDetails(coins) {
    // First get from cache
    let cached = cacheService.getCoinInfo(coins); // Map of tickers to cached objects
    let retrievedFromApi = []; // Array of coin info objects from API
    let toGetFromApi = coins.filter((currencyCode) => {return !cached.has(currencyCode)});
    if (toGetFromApi.length > 0) {
        // Need to retrieve coin info from API
        try {
            retrievedFromApi = await ccApiService.getCoinDetailsCC(toGetFromApi);
        } catch (err) {
            throw(err) // Rethrow, deals with promise rejection error
        }
        cacheService.putCoinInfo(retrievedFromApi) // Put what we retrieve in cache
    }

    return [...retrievedFromApi, ...Array.from(cached.values())];
}

module.exports = {getCoinDetails, getSupportedCurrencies};