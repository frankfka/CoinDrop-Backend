const { validateInput } = require('./networkUtil');
const endpointModel = require('../model/endpointModel');

describe('networkUtil -> Endpoint Input Validation -> GetCoinInfoEndpointModel', () => {
  const modelUnderTest = endpointModel.GetCoinInfoEndpointModel;

  it('valid input passes validation', () => {
    const validInput = ['BTC', 'ETH'];
    validateInput(modelUnderTest, validInput); // Should do nothing
  });

  it('empty array fails validation', () => {
    expect(() => {
      validateInput(modelUnderTest, []);
    }).toThrow('Input not valid');
  });

  it('undefined input fails validation', () => {
    expect(() => {
      validateInput(modelUnderTest, undefined);
    }).toThrow('Input not valid');
  });

  it('null input fails validation', () => {
    expect(() => {
      validateInput(modelUnderTest, null);
    }).toThrow('Input not valid');
  });
});

// TODO: Other validation models
