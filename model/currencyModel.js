const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencySchema = new Schema({
    displayName: String,
    currencyCode: String
    }, {
        collection: 'Currencies'
    });

const Currency = mongoose.model('Currency', currencySchema);

module.exports = { currencySchema, Currency };