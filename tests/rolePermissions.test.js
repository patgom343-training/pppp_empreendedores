const request = require('supertest');
const app = require('../src/index'); // Certifique-se de que o app seja exportado no index.js

describe('Role Permissions', () => {
  let customerToken;
  let businessToken;

  beforeAll(async () => {
    // Registra e faz login de um usuário customer
    await request(app).post('/auth/register').send({
      username: 'customerUser',
      password: 'password123',
      role: 'customer'
    });
    const customerLogin = await request(app).post('/auth/login').send({
      username: 'customerUser',
      password: 'password123'
    });
    customerToken = customerLogin.body.token;

    // Registra e faz login de um usuário business
    await request(app).post('/auth/register').send({
      username: 'businessUser',
      password: 'password123',
      role: 'business'
    });
    const businessLogin = await request(app).post('/auth/login').send({
      username: 'businessUser',
      password: 'password123'
    });
    businessToken = businessLogin.body.token;
  });

  it('should allow customer to access GET endpoints', async () => {
    const response = await request(app)
      .get('/business/businesses')
      .set('Authorization', `Bearer ${customerToken}`);
    expect(response.status).toBe(200);
  });

  it('should deny customer access to POST endpoints', async () => {
    const response = await request(app)
      .post('/business/categories')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ name: 'New Category' });
    expect(response.status).toBe(403);
  });

  it('should allow business to access POST endpoints', async () => {
    const response = await request(app)
      .post('/business/categories')
      .set('Authorization', `Bearer ${businessToken}`)
      .send({ name: 'New Category' });
    expect(response.status).toBe(201);
  });
});
