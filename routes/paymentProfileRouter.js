const express = require('express');
const paymentProfileService = require('../service/paymentProfileService');
const {GetProfileEndpointModel, NewProfileEndpointModel} = require("../model/endpointModel");
const {asyncRoute} = require('./errorHandler');
const {formatProfileForResponse, encryptId, decryptId} = require('../util/databaseUtil');
const {validateInput} = require('../util/networkUtil');
const paymentProfileRouter = express.Router();

paymentProfileRouter.put('/', asyncRoute(newPaymentProfile));
paymentProfileRouter.get('/', asyncRoute(getPaymentProfile));

async function newPaymentProfile(req, res, next) {
    let input = req.body; // Get the input
    validateInput(NewProfileEndpointModel, input); // Validate
    console.log(`Creating profile: ${input}`);
    let newPaymentProfile = await paymentProfileService.create(input);
    let encryptedId = encryptId(newPaymentProfile.profileId); // Encrypt the payment profile ID
    res.json({profileId: encryptedId}) // Return the encrypted ID if successful
}

async function getPaymentProfile(req, res, next) {
    let encryptedProfileId = req.query['profileId']; // Decrypt the payment profile ID
    validateInput(GetProfileEndpointModel, encryptedProfileId); // Validate input schema
    console.log(`Attempting to retrieve profile with encrypted ID: ${encryptedProfileId}`);
    let paymentProfile = await paymentProfileService.get(decryptId(encryptedProfileId)); // Get info
    res.json(formatProfileForResponse(paymentProfile, encryptedProfileId));
}

module.exports = paymentProfileRouter;