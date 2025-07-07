const request = require('supertest');
const { login } = require('@srcApi/store/auth');

describe('Auth', () => {
  test.skip('basic jest', async () => {
    const response = await request('https://fakestoreapi.com')
      .post('/auth/login')
      .send({
        username: 'mor_2314',
        password: '83r5^_',
      });
    expect(response.status).toBe(200);
    expect(response.body.token).toInclude('eyJhbGciOiJIUzI1NiIsInR');
  });
  test('Successful Login', async () => {
    const response = await login('mor_2314', '83r5^_');
    expect(response.body.token).toInclude('eyJhbGciOiJIUzI1NiIsInR');
    expect(response.status).toBe(200);
  });
  // test('Unsucces Login', async () => {
  //   const response = await login('eve.holt@reqres.in', '');
  //   expect(response.body.error).toBe('Missing password');
  // });
});
