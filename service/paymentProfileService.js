const PaymentProfile = require('../model/paymentProfileModel');
const { randomProfileId } = require('../util/databaseUtil');
const ReadPreference = require('mongodb').ReadPreference;

/**
 * Creates and saves a payment profile with the given input
 */
function createPaymentProfile(paymentProfileInput) {
    console.log(`Saving payment profile: ${JSON.stringify(paymentProfileInput)}`);
    const paymentProfile = new PaymentProfile({
        profileId: randomProfileId(),
        dateCreated: Date(),
        ...paymentProfileInput
    });
    return paymentProfile.save()
}

/**
 * Retrieves a payment profile with the given decrypted id
 */
function getPaymentProfile(id) {
    console.log(`Getting payment profile for ${id}`);
    return PaymentProfile.findOne({ profileId: id })
        .read(ReadPreference.NEAREST)
        .exec()
}

module.exports = { create: createPaymentProfile, get: getPaymentProfile };