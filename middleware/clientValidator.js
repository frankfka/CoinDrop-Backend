
const crypto = require('crypto');
const { InputError } = require('../model/error');
const { clientSigningKey, clientAlgorithm } = require('../util/configUtil');

// Helpers & Constants
const TIMEOUT = 1000 * 5; // 5 second timeout in ms
const SIGNATURE_HEADER_KEY = 'X-Coindrop-Signature';
const TIMESTAMP_HEADER_KEY = 'X-Coindrop-Timestamp';
const isEmptyObject = object => (Object.keys(object).length === 0 && object.constructor === Object);
const createSignature = (requestInfo, timestamp) => {
  const requestJSON = JSON.stringify(requestInfo);
  const toEncrypt = `${timestamp}:${requestJSON}`;
  return crypto.createHmac(clientAlgorithm, clientSigningKey)
    .update(toEncrypt)
    .digest('hex');
};
const checkTimestamp = timestamp => Math.abs(new Date().getTime() - parseInt(timestamp)) <= TIMEOUT;
const checkSignatureMatch = (oneSig, otherSig) => {
  try {
    return crypto.timingSafeEqual(
      Buffer.from(oneSig, 'utf8'),
      Buffer.from(otherSig, 'utf8'),
    );
  } catch (err) {
    console.log(`Check signature error: ${err.message}`);
    return false;
  }
};

// Validates client API call
const clientValidator = (req, res, next) => {
  // Extract timestamp and signature from header
  const headerSignature = req.header(SIGNATURE_HEADER_KEY);
  const headerTimestamp = req.header(TIMESTAMP_HEADER_KEY);
  // Check that they exist
  if (!headerSignature || !headerTimestamp) {
    return next(InputError('Required headers not provided'));
  }
  // Check that timestamp is valid
  if (!checkTimestamp(headerTimestamp)) {
    return next(InputError('Timestamp not valid'));
  }
  // Extract the request body/parameters
  const reqBody = req.body;
  const reqQuery = req.query;
  let computedSignature;
  if (!isEmptyObject(reqQuery)) {
    computedSignature = createSignature(reqQuery, headerTimestamp);
  } else {
    computedSignature = createSignature(reqBody, headerTimestamp);
  }
  if (!checkSignatureMatch(computedSignature, headerSignature)) {
    return next(InputError('Computed signature does not match that given in header'));
  }
  next();
};

module.exports = clientValidator;
