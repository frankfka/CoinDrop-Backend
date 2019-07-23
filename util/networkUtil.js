const Validator = require('ajv');

// Throws error if not valid
function validateInput(schema, input) {
  const validator = new Validator();
  const isValid = validator.validate(schema, input);
  if (!isValid) {
    console.error(`Input validation error: ${validator.errorsText()}`);
    const err = Error('Input not valid');
    err.statusCode = 400;
    throw err;
  }
}

module.exports = {
  validateInput,
};
