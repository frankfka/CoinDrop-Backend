const COIN_IMAGE_BASE_URL = 'https://www.cryptocompare.com/';
const COIN_DETAILS_URL = 'https://min-api.cryptocompare.com/data/coin/generalinfo';

const axios = require('axios');
const {coinDetailsApiKey, configVersion} = require('../util/configUtil');
const {BackendConfig} = require('../model/backendConfigModel');
const ReadPreference = require('mongodb').ReadPreference;

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
 * Retrieves coin details from CryptoCompare
 * Expects an array of ticker ID's
 */
function getCoinDetails(coins) {
    return new Promise(function (resolve, reject) {
        // Call the server
        axios.get(COIN_DETAILS_URL, {
            params: {
                fsyms: coins.join(','), // Coins we want info for
                tsym: "USD", // Conversion-to
                api_key: coinDetailsApiKey
            },
            responseType: 'stream'
        }).then(function (res) {
            // Response is a stream - read and attempt to parse it
            let responseBody = '';
            let responseStream = res.data;
            responseStream.on('data', function (chunk) {
                responseBody += chunk;
            });
            responseStream.on('end', function () {
                let responseObj;
                try {
                    responseObj = JSON.parse(responseBody);
                } catch (err) {
                    reject(Error('Coin details JSON parsing failed'))
                }
                if (responseObj['Message'] && responseObj['Message'] === 'Success') {
                    // If Message shows success, resolve the promise, else, the call errored (even if status is 200)
                    resolve(formatResponse(responseObj))
                } else {
                    console.log(`Call to CryptoCompare returned with error: ${responseObj.Message}`);
                    reject(Error('Coin details API returned an error'))
                }
            });
        }).catch(function (err) {
            console.log(`Network call to coin details failed: ${JSON.stringify(err)}`);
            reject(err)
        })
    })
}

/**
 * Extracts only what we need from CryptoCompare
 */
function formatResponse(responseObj) {
    // TODO: Parse price conversion from response body
    let coinsData = responseObj['Data'];
    return coinsData.map(function (data) {
        let coinInfo = data['CoinInfo'];
        return {
            currencyCode: coinInfo['Name'],
            displayName: coinInfo['FullName'],
            imageUrl: COIN_IMAGE_BASE_URL + coinInfo['ImageUrl']
        }
    })
}

module.exports = {getCoinDetails, getSupportedCurrencies};