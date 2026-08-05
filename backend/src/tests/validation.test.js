const { expect } = require('chai');
const validateRequest = require('../middleware/validateRequest');

describe('validateRequest middleware', () => {
  it('fails closed when the schema is missing or invalid', () => {
    const middleware = validateRequest();
    let nextError = null;

    middleware(
      { method: 'POST', body: {} },
      {},
      (error) => {
        nextError = error;
      },
    );

    expect(nextError).to.be.instanceOf(Error);
    expect(nextError.statusCode).to.equal(500);
  });
});
