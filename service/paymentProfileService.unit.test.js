const db = require('./databaseService');
const paymentProfileService = require('./paymentProfileService');

describe('paymentProfileService', () => {
  it('save and retrieve valid profile is successful', async () => {
    expect.assertions(4);
    // Requires connection to DB
    db.connect();
    const validPaymentProfileInput = {
      profileName: 'UnitTest',
      paymentMethods: [
        {
          currencyCode: 'BTC',
          data: 'BTCDATA',
        },
      ],
    };
    const savedProfile = await paymentProfileService.create(validPaymentProfileInput);
    // Check the saved profile
    expect(savedProfile.profileName).toBe(validPaymentProfileInput.profileName);
    expect(savedProfile.paymentMethods)
      .toHaveLength(validPaymentProfileInput.paymentMethods.length);
    // Now retrieve from DB and validate again
    const retrievedProfile = await paymentProfileService.get(savedProfile.profileId);
    expect(retrievedProfile.profileName).toBe(validPaymentProfileInput.profileName);
    expect(retrievedProfile.paymentMethods)
      .toHaveLength(validPaymentProfileInput.paymentMethods.length);
    // Disconnect from DB
    db.disconnect();
  });
});
