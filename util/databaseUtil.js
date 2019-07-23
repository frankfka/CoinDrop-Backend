const crypto = require('crypto');
const { profileAlgorithm, profileKey } = require('./configUtil');

// Creates a random, unencrypted id
function randomProfileId() {
  return Math.random().toString(36).substring(2, 15);
}

// Encrypts an ID using env properties
function encryptId(plainId) {
  const iv = crypto.randomBytes(16); // Nonce initialization vector
  const cipher = crypto.createCipheriv(profileAlgorithm, Buffer.from(profileKey), iv);
  let encrypted = cipher.update(plainId);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}$${encrypted.toString('hex')}`;
}

// Decrypts an ID - returns empty string if decryption failed
function decryptId(encryptedId) {
  try {
    const vectorAndEncryptedText = encryptedId.split('$');
    // Retrieve init vector from the encrypted text
    const iv = Buffer.from(vectorAndEncryptedText.shift(), 'hex');
    // In case there was a $ not associated with IV
    const encryptedText = Buffer.from(vectorAndEncryptedText.join('$'), 'hex');
    const decipher = crypto.createDecipheriv(profileAlgorithm, Buffer.from(profileKey), iv);
    const decrypted = decipher.update(encryptedText);
    return Buffer.concat([decrypted, decipher.final()]).toString();
  } catch (err) {
    // Decryption failed - Improper input
    console.log(`ID decryption failed: ${err.message}`);
    const idValidationError = new Error('Encrypted ID not valid. Could not be decrypted');
    idValidationError.name = 'ValidationError';
    throw idValidationError;
  }
}

// Exports a database model to a json-ready response object
function formatProfileForResponse(paymentProfile, encryptedProfileId) {
  if (!paymentProfile) {
    return {};
  }
  const formattedPaymentMethods = paymentProfile.paymentMethods.map(paymentMethod => ({
    currencyCode: paymentMethod.currencyCode,
    data: paymentMethod.data,
  }));
  return {
    profileId: encryptedProfileId, // Encrypted - Client should validate this to match sent ID
    dateCreated: paymentProfile.dateCreated,
    profileName: paymentProfile.profileName,
    profileEmail: paymentProfile.profileEmail,
    profileMessage: paymentProfile.profileMessage,
    requestAmount: paymentProfile.requestAmount,
    requestAmountCurrencyCode: paymentProfile.requestAmountCurrencyCode,
    paymentMethods: formattedPaymentMethods,
  };
}

module.exports = {
  randomProfileId,
  encryptId,
  decryptId,
  formatProfileForResponse,
};
