const { HEADERS } = require('./config');
// Fungsi untuk menggabungkan header dan menangani debugging
function prepareRequest({ reqHeader = {}, debug = false }) {
  const headers = { ...HEADERS, ...reqHeader };
  if (debug) {
    console.log({ headers });
  }
  return headers;
}

// Fungsi untuk menangani response dan debugging
function handleResponse(response, debug) {
  if (debug) {
    console.log({ body: response.body, status: response.status });
  }
  return { body: response.body, status: response.status };
}

module.exports = { prepareRequest, handleResponse };
