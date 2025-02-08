const request = require('supertest');
const { BASE_URL, HEADERS } = require('../../utils/config');

async function register(reqBody) {
  // HEADERS = { ...HEADERS, reqHeader };
  const response = await request(BASE_URL)
    .post('/register')
    .set({ HEADERS })
    .send(reqBody);
  return { body: response.body, status: response.status };
}

module.exports = { register };
