
const InputError = (message) => {
  let err = Error(message);
  err.name = 'InputError';
  return err;
};

module.exports = {
    InputError
};