const testData = require('../../data-test/testData.json');
const { login } = require('../../src/api/auth.js');
const { users, listUser } = require('../../src/api/users.js');

describe('Create', () => {
  let authToken = '';
  beforeAll(async () => {
    const res = await login(
      testData.users[0].email,
      testData.users[0].password
    );
    authToken = res.body.token;
  });
  test('Succes Create User', async () => {
    const response = await users({
      reqHeader: { token: authToken },
      reqBody: {
        name: 'morpheus',
        job: 'leader',
      },
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('morpheus');
    expect(response.body.job).toBe('leader');
  });

  test('List User', async () => {
    const response = await listUser({
      reqHeader: { token: authToken },
      params: '?page=1',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('page', 1);
    expect(response.body).toHaveProperty('per_page', 6);
    expect(response.body).toHaveProperty('total', 12);
    expect(response.body).toHaveProperty('total_pages', 2);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(6);
  });
  test('Detail User', async () => {
    const response = await listUser({
      reqHeader: { token: authToken },
      params: '/1',
      // debug: true,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});
