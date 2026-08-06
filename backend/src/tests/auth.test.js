const chai = require('chai');
const app = require('../app');

const { expect } = chai;

let server;
let baseUrl;

describe('Authentication routes', () => {
  before((done) => {
    server = app.listen(0, () => {
      const address = server.address();
      baseUrl = `http://127.0.0.1:${address.port}`;
      done();
    });
  });

  after((done) => {
    server.close(done);
  });

  it('returns 400 for invalid login payload', async () => {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'not-an-email' }),
    });

    const body = await response.json();

    expect(response.status).to.equal(400);
    expect(body).to.have.property('success', false);
  });

  it('returns 401 for a protected route without a token', async () => {
    const response = await fetch(`${baseUrl}/api/auth/me`);
    const body = await response.json();

    expect(response.status).to.equal(401);
    expect(body).to.have.property('success', false);
  });
});
