const NodeCache = require('node-cache');
// CryptoCompare caches for 120s, so we mimic that
const coinInfoCache = new NodeCache({ stdTTL: 120, checkperiod: 120 });

/**
 * Retrieves coin info from cache, returns a mapping of key:obj that exist in the cache
 *
 * Expects an array of tickers
 */
function getCoinInfo(coins) {
  // This call can have undefined entries if the coin does not exist in cache
  const cacheResult = coinInfoCache.mget(coins);
  // Construct the final map
  const mapResult = new Map();
  coins.forEach((ticker) => {
    const cached = cacheResult[ticker];
    if (!cached) {
      // Does not exist in cache
      return;
    }
    mapResult.set(ticker, cached);
  });
  return mapResult;
}

/**
 * Puts coin info into the cache asynchronously
 *
 * Expects an array of coin info objects
 */
function putCoinInfo(coinInfoArr) {
  coinInfoArr.forEach((coin) => {
    coinInfoCache.set(coin.currencyCode, coin);
  });
}

module.exports = { getCoinInfo, putCoinInfo };
