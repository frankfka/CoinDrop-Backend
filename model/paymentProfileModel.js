const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Additional validation?

const paymentMethodSchema = new Schema({
   currencyCode: { type: String, required: true }, // Represents a supported currency
   data: { type: String, required: true } // Represents data to encode
});

const paymentProfileSchema = new Schema({
      id: { type: String, required: true, unique: true }, // Used to retrieve using URL param
      dateCreated: { type: Date, required: true }, // Date that this payment profile was created
      profileName: String, // Name of the person requesting payment
      profileEmail: String, // Email of person requesting payment
      profileMessage: String, // Optional message
      requestAmount: Number, // Optional amount of currency requested
      requestAmountCurrencyCode: String, // Optional currency for the amount requested
      paymentMethods: { type: [paymentMethodSchema], required: true } // Supported payment methods
   }, { collection: 'paymentProfiles' });

const PaymentProfile = mongoose.model('PaymentProfile', paymentProfileSchema);
module.exports = PaymentProfile;