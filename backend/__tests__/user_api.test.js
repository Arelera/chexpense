const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

let token = null;
const newUser = {
  username: 'testdog',
  password: 'testpass',
};

// signup user and get token at the start
beforeAll(async () => {
  await api
    .post('/api/user/signup')
    .send(newUser)
    .expect(201)
    .expect((res) => {
      token = res.body.token;
    });
});

// delete user after tests are done
afterAll(async () => {
  await api
    .delete('/api/user')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);
});

describe('/api/user', () => {
  test('Creating a user returns an object with id, username, token', async (done) => {
    await api
      .post('/api/user/login')
      .send(newUser)
      .expect(200)
      .expect(
        ({ body }) => 'id' in body && 'username' in body && 'token' in body
      );
  });
});
