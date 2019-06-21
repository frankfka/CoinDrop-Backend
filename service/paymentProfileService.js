const PaymentProfile = require('../model/paymentProfileModel');
const ReadPreference = require('mongodb').ReadPreference;

require('./databaseService').connect();

/**
 * Creates and saves a payment profile with the given input
 */
async function createPaymentProfile(paymentProfileInput) {
    const paymentProfile = new PaymentProfile({
        id: "asdf", // TODO
        dateCreated: Date(),
        ...paymentProfileInput
    });
    return paymentProfile.save()
}

module.exports = { createPaymentProfile };