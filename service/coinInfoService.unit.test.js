const coinInfoService = require('./coinInfoService');
const db = require('./databaseService');

/**
 * This hits our mongoDB stores as well as the ccAPI
 * TODO: Look into decoupling so that we can mock services
 */
describe('coinInfoService -> get supported currency', () => {
  it('supported currencies is retrieved successfully with non-empty array', async () => {
    expect.assertions(1);
    // Retrieve from db, so need to connect
    db.connect();
    const supportedCurrencies = await coinInfoService.getSupportedCurrencies();
    expect(supportedCurrencies.length).toBeGreaterThan(0);
    db.disconnect();
  });
});

describe('coinInfoService -> get currency details', () => {
  it('retrieving currency details with valid input is successful', async () => {
    expect.assertions(2);
    const currencyCode = 'BTC';
    const coinDetails = await coinInfoService.getCoinDetails([currencyCode]);
    expect(coinDetails).toHaveLength(1);
    expect(coinDetails[0].currencyCode).toBe(currencyCode);
  });

  it('retrieving currency details with empty array returns empty array', async () => {
    expect.assertions(1);
    const coinDetails = await coinInfoService.getCoinDetails([]);
    expect(coinDetails).toHaveLength(0);
  });
});
