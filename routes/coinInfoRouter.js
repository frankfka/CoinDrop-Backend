const express = require('express');
const coinInfoService = require('../service/coinInfoService');
const { GetCoinInfoEndpointModel } = require('../model/endpointModel');
const { validateInput } = require('../util/networkUtil');
const { asyncRoute } = require('../middleware/asyncRouteWrapper');

const coinInfoRouter = express.Router();

// Route constants
const routes = {
  getSupportedCoins: '/all',
  getCoinInfo: '/',
};
const getCoinInfoQueryParam = 'currencyCodes';

async function getCoinInfo(req, res) {
  const input = req.query[getCoinInfoQueryParam];
  let coins = []; // Validation will fail naturally for an empty array
  if (input) {
    coins = input.split(',');
  }
  validateInput(GetCoinInfoEndpointModel, coins);
  console.log(`Getting coin details for: ${coins.toString()}`);
  const retrievedInfo = await coinInfoService.getCoinDetails(coins);
  res.json({ rawCoinInfo: retrievedInfo });
}

async function getAllCoins(req, res) {
  const supportedCurrencies = await coinInfoService.getSupportedCurrencies();
  res.json({ allCoins: supportedCurrencies });
}

coinInfoRouter.get(routes.getCoinInfo, asyncRoute(getCoinInfo));
coinInfoRouter.get(routes.getSupportedCoins, asyncRoute(getAllCoins));

module.exports = { coinInfoRouter, routes };
