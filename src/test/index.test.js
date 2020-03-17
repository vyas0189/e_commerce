/* eslint-disable no-undef */
import request from 'supertest';
import app from '../config';

describe('Home Endpoint', () => {
  it('GET: Return Welcome Message', async () => {
    const res = await request(app)
      .get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('welcom');
  });
});
