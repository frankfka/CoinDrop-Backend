// For working with the CryptoCompare API

const COIN_IMAGE_BASE_URL = 'https://www.cryptocompare.com/';
const COIN_DETAILS_URL = 'https://min-api.cryptocompare.com/data/coin/generalinfo';

const axios = require('axios');
const { coinDetailsApiKey } = require('../util/configUtil');
const { logger } = require('../util/logUtil');

/**
 * Extracts only what we need from CryptoCompare
 */
function formatResponse(responseObj) {
  // TODO: Parse price conversion from response body
  const coinsData = responseObj.Data;
  return coinsData.map((data) => {
    const coinInfo = data.CoinInfo;
    return {
      currencyCode: coinInfo.Name,
      displayName: coinInfo.FullName,
      imageUrl: COIN_IMAGE_BASE_URL + coinInfo.ImageUrl,
    };
  });
}

/**
 * Retrieves coin details from CryptoCompare
 * Expects an array of ticker ID's
 */
function getCoinDetailsCC(coins) {
  // Wrap in a promise to make this stream-compatible
  return new Promise(((resolve, reject) => {
    // Call the server
    axios.get(COIN_DETAILS_URL, {
      params: {
        fsyms: coins.join(','), // Coins we want info for
        tsym: 'USD', // Conversion-to
        api_key: coinDetailsApiKey,
      },
      responseType: 'stream',
    }).then((res) => {
      // Response is a stream - read and attempt to parse it
      let responseBody = '';
      const responseStream = res.data;
      responseStream.on('data', (chunk) => {
        responseBody += chunk;
      });
      responseStream.on('end', () => {
        let responseObj;
        try {
          responseObj = JSON.parse(responseBody);
        } catch (err) {
          reject(Error('Coin details JSON parsing failed'));
        }
        if (responseObj.Message && responseObj.Message === 'Success') {
          // If Message shows success, resolve the promise
          // else, the call errored (even if status is 200)
          resolve(formatResponse(responseObj));
        } else {
          logger.error(`Call to CryptoCompare returned with error: ${responseObj.Message}`);
          reject(Error('Coin details API returned an error'));
        }
      });
    }).catch((err) => {
      logger.error(`Network call to coin details failed: ${JSON.stringify(err)}`);
      reject(err);
    });
  }));
}


module.exports = { getCoinDetailsCC };
