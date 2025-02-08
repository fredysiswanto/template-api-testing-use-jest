const { login } = require('../../src/api/auth.js');

describe('Auth', () => {
  test('Successful Login', async () => {
    const response = await login('eve.holt@reqres.in', 'cityslicka');
    expect(response.body.token).toBe('QpwL5tke4Pnpja7X4');
    expect(response.status).toBe(200);
  });
  test('Unsucces Login', async () => {
    const response = await login('eve.holt@reqres.in', '');
    expect(response.body.error).toBe('Missing password');
  });
});
