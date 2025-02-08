const { register } = require('../../src/api/register.js');

describe('Register', () => {
  test('Succes Register', async () => {
    const response = await register({
      email: 'eve.holt@reqres.in',
      password: 'pistol',
    });
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(4);
    expect(response.body.token).toBe('QpwL5tke4Pnpja7X4');
  });
});
