const { validateInput } = require('./networkUtil');
const endpointModel = require('../model/endpointModel');

describe('networkUtil -> Endpoint Input Validation -> GetCoinInfoEndpointModel', () => {
  const modelUnderTest = endpointModel.GetCoinInfoEndpointModel;

  it('valid input passes validation', () => {
    expect.assertions(1);
    const validInput = ['BTC', 'ETH'];
    expect(validateInput(modelUnderTest, validInput)).toBeUndefined(); // Should do nothing
  });

  it('empty array fails validation', () => {
    expect.assertions(1);
    expect(() => {
      validateInput(modelUnderTest, []);
    }).toThrow('Input not valid');
  });

  it('undefined input fails validation', () => {
    expect.assertions(1);
    expect(() => {
      validateInput(modelUnderTest, undefined);
    }).toThrow('Input not valid');
  });

  it('null input fails validation', () => {
    expect.assertions(1);
    expect(() => {
      validateInput(modelUnderTest, null);
    }).toThrow('Input not valid');
  });
});

// TODO: Other validation models
