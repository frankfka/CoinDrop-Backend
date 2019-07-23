const mongoose = require('mongoose');

const { Schema } = mongoose;

const backendConfigSchema = new Schema({
  supportedCurrencies: { type: [String], required: true },
  dateCreated: { type: Date, required: true },
  version: { type: String, required: true },
}, {
  collection: 'backendConfig',
  autoIndex: false,
});

const BackendConfig = mongoose.model('BackendConfig', backendConfigSchema);

module.exports = { backendConfigSchema, BackendConfig };
