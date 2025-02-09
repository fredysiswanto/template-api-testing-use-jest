const testData = require('@dataTest/testData.json');
const { getTokenLogin } = require('@srcApi/ecommerce/auth');
const {
  users,
  addUser,
  updateUser,
  deleteUser,
} = require('@srcApi/ecommerce/user.js');

describe('Test url api /user', () => {
  let authToken = '';
  beforeAll(async () => {
    const res = await getTokenLogin();
    authToken = res;
  });
  test('Get all users', async () => {
    const response = await users({
      reqHeader: { token: authToken },
      reqBody: {},
      params: '',
      debug: false,
    });
    const { body } = response;
    expect(response.status).toBe(200);
    expect(body[0]).toContainKeys(['email', 'name', 'id']);
  });
});
