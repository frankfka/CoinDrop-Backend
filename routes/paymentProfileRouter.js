const express = require('express');
const paymentProfileService = require('../service/paymentProfileService');
const { asyncRoute } = require('./errorHandler');
const { formatProfileForResponse, encryptId, decryptId } = require('../util/databaseUtil');
const paymentProfileRouter = express.Router();

paymentProfileRouter.put('/', asyncRoute(newPaymentProfile));
paymentProfileRouter.get('/', asyncRoute(getPaymentProfile));

async function newPaymentProfile(req, res, next) {
    let newPaymentProfile = await paymentProfileService.create(req.body);
    // Encrypt the payment profile ID
    let encryptedId = encryptId(newPaymentProfile.profileId);
    res.json({profileId: encryptedId})
}

async function getPaymentProfile(req, res, next) {
    // Decrypt the payment profile ID
    let encryptedProfileId = req.query.profileId;
    console.log(`Attempting to retrieve profile with encrypted ID: ${encryptedProfileId}`);
    let paymentProfile = await paymentProfileService.get(decryptId(encryptedProfileId));
    res.json(formatProfileForResponse(paymentProfile, encryptedProfileId));
}

module.exports = paymentProfileRouter;