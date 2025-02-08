const request = require('supertest');
let { BASE_URL } = require('../../utils/config');
const { prepareRequest, handleResponse } = require('../../utils/helper');
const url = '/users';

async function users({
  reqHeader = {},
  reqBody = {},
  params = '',
  debug = false,
}) {
  const headers = prepareRequest({ reqHeader, debug });
  const response = await request(BASE_URL).post(url).set(headers).send(reqBody);
  return handleResponse(response, debug);
}

async function listUser({
  reqHeader = {},
  reqBody = {},
  params = '',
  debug = false,
}) {
  const headers = prepareRequest({ reqHeader, debug });
  const response = await request(BASE_URL)
    .get(`${url}${params}`)
    .set(headers)
    .send(reqBody);
  return handleResponse(response, debug);
}

async function detailUser({
  reqHeader = {},
  reqBody = {},
  params = '',
  debug = false,
}) {
  const headers = prepareRequest({ reqHeader, debug });
  const response = await request(BASE_URL)
    .get(`${url}${params}`)
    .set(headers)
    .send(reqBody);
  return handleResponse(response, debug);
}

module.exports = { users, listUser, detailUser };
