const Validator = require('ajv');

// Throws error if not valid
function validateInput(schema, input) {
    let validator = new Validator();
    let isValid = validator.validate(schema, input);
    if (!isValid) {
        console.error(`Input validation error: ${validator.errorsText()}`);
        const err = Error("Input not valid");
        err.statusCode = 400;
        throw err
    }
}

module.exports = {
    validateInput
};