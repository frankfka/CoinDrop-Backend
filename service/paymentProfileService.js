const { ReadPreference } = require('mongodb');
const PaymentProfile = require('../model/paymentProfileModel');
const { randomProfileId } = require('../util/databaseUtil');
const { logger } = require('../util/logUtil');

/**
 * Creates and saves a payment profile with the given input
 */
function createPaymentProfile(paymentProfileInput) {
  logger.info(`Saving payment profile: ${JSON.stringify(paymentProfileInput)}`);
  const paymentProfile = new PaymentProfile({
    profileId: randomProfileId(),
    dateCreated: Date(),
    ...paymentProfileInput,
  });
  return paymentProfile.save();
}

/**
 * Retrieves a payment profile with the given decrypted id
 */
function getPaymentProfile(id) {
  logger.info(`Getting payment profile for ${id}`);
  return PaymentProfile.findOne({ profileId: id })
    .read(ReadPreference.NEAREST)
    .exec();
}

module.exports = { create: createPaymentProfile, get: getPaymentProfile };
