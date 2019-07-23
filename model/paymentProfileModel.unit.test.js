const PaymentProfile = require('./paymentProfileModel');

// Test health check
describe('paymentProfileModel -> Validation Test', () => {
  it('valid payment profile with all fields passes mongoose validation',
    () => {
      const validPaymentProfile = PaymentProfile({
        profileId: 'uniqueprofileid',
        dateCreated: Date(),
        profileName: 'John Doe',
        profileEmail: 'JohnDoe@Email.com',
        profileMessage: 'Message',
        requestAmount: 20,
        requestAmountCurrencyCode: 'BTC',
        paymentMethods: [
          {
            currencyCode: 'BTC',
            data: 'BTCDATA',
          },
          {
            currencyCode: 'ETH',
            data: 'ETHDATA',
          },
        ],
      });
      const validationError = validPaymentProfile.validateSync();
      expect(validationError).toBeUndefined();
    });

  it(
    'valid payment profile with only required fields passes mongoose validation',
    () => {
      const validPaymentProfile = PaymentProfile({
        profileId: 'uniqueprofileid',
        dateCreated: Date(),
        paymentMethods: [
          {
            currencyCode: 'BTC',
            data: 'BTCDATA',
          },
          {
            currencyCode: 'ETH',
            data: 'ETHDATA',
          },
        ],
      });
      const validationError = validPaymentProfile.validateSync();
      expect(validationError).toBeUndefined();
    },
  );

  it('invalid payment profile with missing ID fails mongoose validation',
    () => {
      const missingIdPaymentProfile = PaymentProfile({
        dateCreated: Date(),
        paymentMethods: [
          {
            currencyCode: 'BTC',
            data: 'BTCDATA',
          },
          {
            currencyCode: 'ETH',
            data: 'ETHDATA',
          },
        ],
      });
      const validationError = missingIdPaymentProfile.validateSync();
      expect(validationError).toBeDefined();
    });

  it('invalid payment profile with empty payment methods fails validation',
    () => {
      const missingIdPaymentProfile = PaymentProfile({
        profileId: 'uniqueprofileid',
        dateCreated: Date(),
        paymentMethods: [],
      });
      const validationError = missingIdPaymentProfile.validateSync();
      expect(validationError).toBeDefined();
    });
});
