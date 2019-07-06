const express = require('express');
const coinInfoService = require('../service/coinInfoService');
const {asyncRoute} = require("./errorHandler");
const coinInfoRouter = express.Router();

coinInfoRouter.get('/', asyncRoute(getCoinInfo));
coinInfoRouter.get('/all', asyncRoute(getAllCoins));

async function getAllCoins(req, res, next) {
    console.log('Getting all supported coins');
    let supportedCurrencies = await coinInfoService.getSupportedCurrencies();
    res.json({allCoins: supportedCurrencies});
}

async function getCoinInfo(req, res, next) {
    // TODO: Validate the input
    let coins = req.query['currencyCodes'].split(','); // Should be an array of strings
    console.log(`Getting coin details for: ${coins.toString()}`);
    let retrievedInfo = await coinInfoService.getCoinDetails(coins);
    res.json({rawCoinInfo: retrievedInfo});
}

module.exports = coinInfoRouter;