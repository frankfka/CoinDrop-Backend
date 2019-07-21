const {validateInput} = require('./networkUtil');
const endpointModel = require('../model/endpointModel');

describe('networkUtil -> Endpoint Input Validation -> GetCoinInfoEndpointModel', () => {

    const modelUnderTest = endpointModel.GetCoinInfoEndpointModel;

    test('Valid input passes validation', () => {
        const validInput = ['BTC', 'ETH'];
        validateInput(modelUnderTest, validInput) // Should do nothing
    });

    test('Empty array fails validation', () => {
        expect(() => {
            validateInput(modelUnderTest, [])
        }).toThrow('Input not valid')
    });

    test('Undefined input fails validation', () => {
        expect(() => {
            validateInput(modelUnderTest, undefined)
        }).toThrow('Input not valid')
    });

    test('Null input fails validation', () => {
        expect(() => {
            validateInput(modelUnderTest, null)
        }).toThrow('Input not valid')
    })

});

// TODO: Other validation models