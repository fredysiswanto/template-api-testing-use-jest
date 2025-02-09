const request = require('supertest');
let { BASE_URL } = require('@config/config');
const { prepareRequest, handleResponse } = require('@config/helper');

const url = '/users';
// GET
async function users({
  reqHeader = {},
  reqBody = {},
  params = '',
  debug = false,
}) {
  const headers = prepareRequest({ reqHeader, debug });
  const response = await request(BASE_URL).get(`${url}${params}`).set(headers);
  return handleResponse(response, debug);
}

// POST
async function addUser({
  reqHeader = {},
  reqBody = {},
  params = '',
  debug = false,
}) {
  const headers = prepareRequest({ reqHeader, debug });
  const response = await request(BASE_URL).post(url).set(headers).send(reqBody);
  return handleResponse(response, debug);
}

// PUT
async function updateUser({
  reqHeader = {},
  reqBody = {},
  params = '',
  debug = false,
}) {
  const headers = prepareRequest({ reqHeader, debug });
  const response = await request(BASE_URL)
    .put(`${url}${params}`)
    .set(headers)
    .send(reqBody);
  return handleResponse(response, debug);
}

// DELETE
async function deleteUser({
  reqHeader = {},
  reqBody = {},
  params = '',
  debug = false,
}) {
  const headers = prepareRequest({ reqHeader, debug });
  const response = await request(BASE_URL)
    .delete(`${url}${params}`)
    .set(headers)
    .send(reqBody);
  return handleResponse(response, debug);
}
module.exports = { users, addUser, updateUser, deleteUser };
