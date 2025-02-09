const request = require('supertest');
const { BASE_URL, HEADERS } = require('@config/config');

async function login(username, password) {
  const response = await request(BASE_URL)
    .post('/auth/login')
    .set(HEADERS)
    .send({ username, password });
  return { body: response.body, status: response.status }; // Return token untuk test case lain
}
async function getTokenLogin() {
  const response = await request(BASE_URL)
    .post('/auth/login')
    .set(HEADERS)
    .send({
      username: 'mor_2314',
      password: '83r5^_',
    });
  return response.body.token; // Return token untuk test case lain
}

module.exports = { login, getTokenLogin };
