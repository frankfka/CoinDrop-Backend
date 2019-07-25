const databaseUtil = require('./databaseUtil');

describe('databaseUtil -> ID Encryption/Decryption', () => {
  it('random ID is encrypted and decrypted successfully', () => {
    expect.assertions(1);
    const randomId = databaseUtil.randomProfileId();
    const encrypted = databaseUtil.encryptId(randomId);
    const decrypted = databaseUtil.decryptId(encrypted);
    expect(decrypted).toBe(randomId);
  });
});

describe('databaseUtil -> formatProfileForResponse', () => {
  it('valid payment profile is parsed into the correct response object', () => {
    expect.assertions(1);
    const id = 'test';
    const paymentProfileObject = {
      dateCreated: 'dateCreated',
      profileName: 'profileName',
      profileEmail: 'profileEmail',
      profileMessage: 'profileMessage',
      requestAmount: 'requestAmount',
      requestAmountCurrencyCode: 'requestAmountCurrencyCode',
      paymentMethods: [
        {
          currencyCode: 'BTC',
          data: 'btcData',
        },
        {
          currencyCode: 'ETH',
          data: 'ethData',
        },
      ],
    };
    const expectedResponseObject = {
      profileId: id,
      dateCreated: 'dateCreated',
      profileName: 'profileName',
      profileEmail: 'profileEmail',
      profileMessage: 'profileMessage',
      requestAmount: 'requestAmount',
      requestAmountCurrencyCode: 'requestAmountCurrencyCode',
      paymentMethods: [
        {
          currencyCode: 'BTC',
          data: 'btcData',
        },
        {
          currencyCode: 'ETH',
          data: 'ethData',
        },
      ],
    };
    const responseObject = databaseUtil.formatProfileForResponse(paymentProfileObject, id);
    expect(responseObject).toMatchObject(expectedResponseObject);
  });

  it('null payment profile results in empty object response', () => {
    expect.assertions(1);
    const responseObject = databaseUtil.formatProfileForResponse(null, 'test');
    expect(responseObject).toMatchObject({});
  });

  it('undefined payment profile results in empty object response', () => {
    expect.assertions(1);
    const responseObject = databaseUtil.formatProfileForResponse(undefined, 'test');
    expect(responseObject).toMatchObject({});
  });
});
