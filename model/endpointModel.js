/*
Contains all the schemas for inputs
 */


// Coin Info
let GetCoinInfoEndpointModel = {
    "type": "array",
    "items": {
        "type": "string"
    },
    "minItems": 1
};

// Payment Profile
let NewProfileEndpointModel = {
    "type": "object",
    "properties": {
        "paymentMethods": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "currencyCode": {
                        "type": "string"
                    },
                    "data": {
                        "type": "string"
                    }
                },
                "required": ["currencyCode", "data"]
            },
            "minItems": 1
        }
    },
    "required": ["paymentMethods"]
};

let GetProfileEndpointModel = {
    "type": "string"
};

module.exports = {
    GetCoinInfoEndpointModel,
    NewProfileEndpointModel,
    GetProfileEndpointModel
};