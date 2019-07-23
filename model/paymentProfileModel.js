const mongoose = require('mongoose');

const { Schema } = mongoose;

const paymentMethodSchema = new Schema({
  currencyCode: { type: String, required: true }, // Represents a supported currency
  data: { type: String, required: true }, // Represents data to encode
}, { autoIndex: false });

const paymentProfileSchema = new Schema({
  profileId: { type: String, required: true, unique: true }, // Used to retrieve using URL param
  dateCreated: { type: Date, required: true }, // Date that this payment profile was created
  profileName: String, // Name of the person requesting payment
  profileEmail: String, // Email of person requesting payment
  profileMessage: String, // Optional message
  requestAmount: Number, // Optional amount of currency requested
  requestAmountCurrencyCode: String, // Optional currency for the amount requested
  paymentMethods: { type: [paymentMethodSchema], required: true, validate: [array => array.length > 0, 'Payment Methods is Empty'] }, // Supported payment methods
}, { collection: 'paymentProfiles', autoIndex: false });

const PaymentProfile = mongoose.model('PaymentProfilePage', paymentProfileSchema);
module.exports = PaymentProfile;
