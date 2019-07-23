
const InputError = (message) => {
  const err = Error(message);
  err.name = 'InputError';
  return err;
};

module.exports = {
  InputError,
};
