const express = require('express');
const paymentProfileService = require('../service/paymentProfileService');
const { GetProfileEndpointModel, NewProfileEndpointModel } = require('../model/endpointModel');
const { asyncRoute } = require('../middleware/asyncRouteWrapper');
const { formatProfileForResponse, encryptId, decryptId } = require('../util/databaseUtil');
const { validateInput } = require('../util/networkUtil');
const { logger } = require('../util/logUtil');

const paymentProfileRouter = express.Router();

// Router and query constants
const routes = {
  getPaymentProfile: '/',
  putPaymentProfile: '/',
};
const profileIdQueryParam = 'profileId';

async function newPaymentProfile(req, res) {
  const input = req.body; // Get the input
  validateInput(NewProfileEndpointModel, input); // Validate
  logger.info(`Creating profile: ${input}`);
  const paymentProfile = await paymentProfileService.create(input);
  const encryptedId = encryptId(paymentProfile.profileId); // Encrypt the payment profile ID
  res.json({ profileId: encryptedId }); // Return the encrypted ID if successful
}

async function getPaymentProfile(req, res) {
  const encryptedProfileId = req.query[profileIdQueryParam]; // Decrypt the payment profile ID
  validateInput(GetProfileEndpointModel, encryptedProfileId); // Validate input schema
  logger.info(`Attempting to retrieve profile with encrypted ID: ${encryptedProfileId}`);
  // Get info from decrypted id
  const paymentProfile = await paymentProfileService.get(decryptId(encryptedProfileId));
  res.json(formatProfileForResponse(paymentProfile, encryptedProfileId));
}

paymentProfileRouter.put(routes.putPaymentProfile, asyncRoute(newPaymentProfile));
paymentProfileRouter.get(routes.getPaymentProfile, asyncRoute(getPaymentProfile));

module.exports = { paymentProfileRouter, routes };
