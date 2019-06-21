const express = require('express');
const paymentProfileService = require('../service/paymentProfileService');
const { asyncRoute } = require('./errorHandler');
const paymentProfileRouter = express.Router();

async function newPaymentProfile(req, res, next) {
    let { paymentMethods } = req.body;
    // Check required parameters
    if (!paymentMethods || !paymentMethods.length) {
        res.status(400);
        return next(Error("Required parameters not passed"))
    }
    let newPaymentProfile = await paymentProfileService.createPaymentProfile(req.body);
    res.json(newPaymentProfile)
}

paymentProfileRouter.put('/new', asyncRoute(newPaymentProfile));

module.exports = paymentProfileRouter;