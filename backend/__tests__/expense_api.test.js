const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const newUser = {
  username: 'expense_api_tester',
  password: 'yo',
};
const newExpense = { amount: 22 };

let token = null;
let userId = null;
let expenseId = null;
// create user and get token
beforeAll(async () => {
  await api
    .post('/api/user/signup')
    .send(newUser)
    .expect(201)
    .expect((res) => {
      token = res.body.token;
      userId = res.body.id;
    });
});

// delete user after tests
afterAll(async () => {
  await api
    .delete('/api/user')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);
});

describe('/api/expense', () => {
  test('Creating an expense returns an object with id, creator, amount', async () => {
    await api
      .post('/api/expense')
      .send(newExpense)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect(({ body }) => {
        expenseId = body.id;
        return (
          'id' in body && 'creator' in body && body.amount === newExpense.amount
        );
      });
  });

  test('Can get users expenses', async () => {
    await api
      .get('/api/expense')
      .set('Authorization', `Bearer ${token}`)
      .expect(({ body }) => {
        return (
          body[0].id === expenseId &&
          body[0].amount === newExpense.amount &&
          body[0].creator === userId
        );
      });
  });

  test('Deleting an expense returns status code 204', async () => {
    await api
      .delete(`/api/expense/${expenseId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});
