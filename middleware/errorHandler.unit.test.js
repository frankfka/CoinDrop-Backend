const { input, generic } = require('./errorHandler');

const mockResponse = () => {
  const res = {
    status: () => {},
    json: () => {},
  };
  jest.spyOn(res, 'status').mockReturnValue(res);
  jest.spyOn(res, 'json').mockReturnValue(res);
  return res;
};

describe('errorHandler -> input handler', () => {
  it('mongoDB validation error is handled with a 400 response', async () => {
    expect.assertions(1);
    const err = Error('ValidationError');
    err.name = 'ValidationError';
    const res = mockResponse();
    const req = {};
    await input(err, req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('input validation error is handled with a 400 response', async () => {
    expect.assertions(1);
    const err = Error('InputError');
    err.name = 'InputError';
    const res = mockResponse();
    const req = {};
    await input(err, req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('generic error is not handled', async () => {
    expect.assertions(1);
    const err = Error();
    const next = jest.fn();
    await input(err, null, null, next);
    expect(next).toHaveBeenCalledWith(err);
  });
});

describe('errorHandler -> generic handler', () => {
  it('generic error is handled with a 500 response', async () => {
    expect.assertions(1);
    const err = Error();
    const res = mockResponse();
    const req = {};
    await generic(err, req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
