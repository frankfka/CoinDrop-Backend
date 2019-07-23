const Validator = require('ajv');
const { logger } = require('../util/logUtil');

// Throws error if not valid
function validateInput(schema, input) {
  const validator = new Validator();
  const isValid = validator.validate(schema, input);
  if (!isValid) {
    logger.error(`Input validation error: ${validator.errorsText()}`);
    const err = Error('Input not valid');
    err.statusCode = 400;
    throw err;
  }
}

module.exports = {
  validateInput,
};
