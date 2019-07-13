const express = require('express');
const coinInfoService = require('../service/coinInfoService');
const {GetCoinInfoEndpointModel} = require("../model/endpointModel");
const {validateInput} = require("../util/networkUtil");
const {asyncRoute} = require("./errorHandler");
const coinInfoRouter = express.Router();

coinInfoRouter.get('/', asyncRoute(getCoinInfo));
coinInfoRouter.get('/all', asyncRoute(getAllCoins));

async function getAllCoins(req, res, next) {
    let supportedCurrencies = await coinInfoService.getSupportedCurrencies();
    res.json({allCoins: supportedCurrencies});
}

async function getCoinInfo(req, res, next) {
    let input = req.query['currencyCodes'];
    let coins = []; // Validation will fail naturally for an empty array
    if (input) {
        coins = input.split(',');
    }
    validateInput(GetCoinInfoEndpointModel, coins);
    console.log(`Getting coin details for: ${coins.toString()}`);
    let retrievedInfo = await coinInfoService.getCoinDetails(coins);
    res.json({rawCoinInfo: retrievedInfo});
}

module.exports = coinInfoRouter;