const databaseUtil = require('./databaseUtil');

describe('databaseUtil -> ID Encryption/Decryption', () => {

    test('Random ID is encrypted and decrypted successfully', () => {
        const randomId = databaseUtil.randomProfileId();
        const encrypted = databaseUtil.encryptId(randomId);
        const decrypted = databaseUtil.decryptId(encrypted);
        expect(decrypted).toBe(randomId);
    })

});

describe('databaseUtil -> formatProfileForResponse', () => {

    test('Valid payment profile is parsed into the correct response object', () => {
        const id = "test";
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
                    data: 'btcData'
                },
                {
                    currencyCode: 'ETH',
                    data: 'ethData'
                }
            ]
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
                    data: 'btcData'
                },
                {
                    currencyCode: 'ETH',
                    data: 'ethData'
                }
            ]
        };
        const responseObject = databaseUtil.formatProfileForResponse(paymentProfileObject, id);
        expect(responseObject).toMatchObject(expectedResponseObject)
    });

    test('Null payment profile results in empty object response', () => {
        const responseObject = databaseUtil.formatProfileForResponse(null, 'test');
        expect(responseObject).toMatchObject({})
    });

    test('Undefined payment profile results in empty object response', () => {
        const responseObject = databaseUtil.formatProfileForResponse(undefined, 'test');
        expect(responseObject).toMatchObject({})
    });

});