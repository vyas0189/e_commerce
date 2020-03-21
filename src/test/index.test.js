/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
import 'dotenv/config';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../config';

const TEST_DB = 'test';

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      if (error.message === 'ns not found') return;

      if (error.message.includes('a background operation is currently running')) return;

      console.log(error.message);
    }
  }
}
beforeAll(async () => {
  const url = `mongodb://localhost/${TEST_DB}`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

describe('Home', () => {
  it('GET: Return Welcome Message', async (done) => {
    const res = await request(app)
      .get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('welcome');
    done();
  });

  it('POST: Address Validation', async (done) => {
    const res = await request(app)
      .post('/address')
      .send({
        address: '4800 Calhoun Rd',
        city: 'Houston',
        state: 'TX',
        zip: '77004',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.XAVResponse).toHaveProperty('Candidate');
    done();
  });

  it('POST(FAIL): Address Validation', async (done) => {
    const res = await request(app)
      .post('/address')
      .send({
        city: 'Houston',
        state: 'TX',
        zip: '77004',
      });

    expect(res.statusCode).toEqual(500);
    expect(res.body.details[0].message).toMatch('"address" is required');
    done();
  });

  it('POST: Create User', async (done) => {
    const res = await request(app)
      .post('/user/register')
      .send({
        firstName: 'Test',
        username: 'test0',
        password: '@Testing0',
        lastName: 'Testing',
        email: 'test@gmail.com',
        address: '1111 Test Dr',
        address2: 'APT 12',
        city: 'TestCity',
        state: 'TX',
        zip: '7777',
        role: 'user',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    done();
  });

  it('POST(FAIL): Create User', async (done) => {
    const res = await request(app)
      .post('/user/register')
      .send({
        firstName: 'Test',
        username: 'test0',
        password: '@Testing0',
        lastName: 'Testing',
        email: 'test@gmail.com',
        address: '1111 Test Dr',
        address2: 'APT 12',
        city: 'TestCity',
        state: 'TX',
        zip: '7777',
        role: 'user',
      });

    expect(res.statusCode).toEqual(500);
    expect(res.body.error.msg).toMatch('User already exists');
    done();
  });

  it('POST: LOGIN USER', async (done) => {
    const res = await request(app)
      .post('/user/login')
      .send({ username: 'test0', password: '@Testing0' });

    expect(res.statusCode).toEqual(200);
    done();
  });

  // it('POST: LOGOUT USER', async (done) => {
  //   const res = await request(app)
  //     .get('/user/logout');
  //   console.log(res.error);

  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toHaveProperty('message');
  //   done();
  // });
  // it('POST: Add an item', async(req, res) => )
});

// afterEach(async () => {
//   await removeAllCollections();
// });

afterAll(async () => {
  await dropAllCollections();
  await mongoose.connection.close();
});
