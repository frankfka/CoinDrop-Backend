/*
Contains all the schemas for inputs
 */


// Coin Info
const GetCoinInfoEndpointModel = {
  type: 'array',
  items: {
    type: 'string',
  },
  minItems: 1,
};

// Payment Profile
const NewProfileEndpointModel = {
  type: 'object',
  properties: {
    paymentMethods: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          currencyCode: {
            type: 'string',
          },
          data: {
            type: 'string',
          },
        },
        required: ['currencyCode', 'data'],
      },
      minItems: 1,
    },
  },
  required: ['paymentMethods'],
};

const GetProfileEndpointModel = {
  type: 'string',
};

module.exports = {
  GetCoinInfoEndpointModel,
  NewProfileEndpointModel,
  GetProfileEndpointModel,
};
