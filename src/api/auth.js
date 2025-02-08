const request = require('supertest');
const { BASE_URL, HEADERS } = require('../../utils/config');

async function login(email, password) {
  const response = await request(BASE_URL)
    .post('/login')
    .set(HEADERS)
    .send({ email, password });
  return { body: response.body, status: response.status }; // Return token untuk test case lain
}

async function logout(token) {
  return request(BASE_URL)
    .post('/logout')
    .set({ ...HEADERS, Authorization: `Bearer ${token}` });
}

module.exports = { login, logout };
