/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
import 'dotenv/config';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../config';

const TEST_DB = 'test';
const agent = request.agent(app);

// async function removeAllCollections() {
//   const collections = Object.keys(mongoose.connection.collections);
//   for (const collectionName of collections) {
//     const collection = mongoose.connection.collections[collectionName];
//     await collection.deleteMany();
//   }
// }
let productID;
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
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
  await agent
    .post('/user/register')
    .send({
      firstName: 'Admin',
      username: 'admin',
      password: '@Admin0',
      lastName: 'Testing',
      email: 'admin@gmail.com',
      address: '1111 Test Dr',
      address2: 'APT 12',
      city: 'TestCity',
      state: 'TX',
      zip: '7777',
      role: 'admin',
    });
  const productAdd = await agent
    .post('/product/')
    .send({
      name: 'Underamor Shirt',
      productType: 'men',
      quantity: 50,
      price: 25.00,
      image: 'https://istockphoto.6q33.net/c/372642/258824/4205?u=https%3A%2F%2Fwww.istockphoto.com%2Fphoto%2Fconfidence-puts-any-outfit-together-perfectly-gm1070782274-286524454',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam recusandae fuga corporis accusantium, tenetur quos. Vel, facilis harum mollitia quidem, voluptas ea laudantium assumenda quod esse delectus unde sed ut.',
    });
  productID = productAdd.body.product._id;

  await agent
    .delete('/user/logout');
});

describe('Home', () => {
  it('GET: Return Welcome Message', async (done) => {
    const res = await agent
      .get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('welcome');
    done();
  });

  it('POST: Address Validation', async (done) => {
    const res = await agent
      .post('/address')
      .send({
        address: '4800 Calhoun Rd',
        city: 'Houston',
        state: 'TX',
        zip: '77004',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.XAVResponse).toHaveProperty('Candidate');
    done();
  });

  it('POST(FAIL): Address Validation', async (done) => {
    const res = await agent
      .post('/address')
      .send({
        city: 'Houston',
        state: 'TX',
        zip: '77004',
      });

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toMatch('Unable to validate');
    done();
  });

  it('POST: Create User', async (done) => {
    const res = await agent
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

  it('GET: Return current user info', async (done) => {
    const res = await agent
      .get('/user/me');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch('OK');
    done();
  });

  it('POST(FAIL): Create User already logged in', async (done) => {
    const res = await agent
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
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toMatch('You are already logged in');
    done();
  });

  it('DELETE: LOGOUT USER', async (done) => {
    const res = await agent
      .delete('/user/logout');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch('OK');
    done();
  });

  it('POST(FAIL): Create User already exists', async (done) => {
    const res = await agent
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
    expect(res.body.message).toMatch('User already exists');
    done();
  });

  it('POST(FAIL): LOGIN USER wrong password', async (done) => {
    const res = await agent
      .post('/user/login')
      .send({ username: 'test0', password: '@Testing00' });

    expect(res.statusCode).toEqual(401);

    expect(res.body.message).toMatch('Incorrect email or password');
    done();
  });

  it('POST(FAIL): LOGIN USER wrong username', async (done) => {
    const res = await agent
      .post('/user/login')
      .send({ username: 'test', password: '@Testing0' });

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toMatch('Incorrect email or password');
    done();
  });

  it('POST(FAIL): LOGIN USER wrong username and password', async (done) => {
    const res = await agent
      .post('/user/login')
      .send({ username: 'test', password: '@Testing00' });

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toMatch('Incorrect email or password');
    done();
  });

  it('POST: LOGIN USER', async (done) => {
    const res = await agent
      .post('/user/login')
      .send({ username: 'test0', password: '@Testing0' });

    expect(res.statusCode).toEqual(200);
    done();
  });
  it('PUT: Update User', async (done) => {
    const res = await agent
      .put('/user/update')
      .send({
        firstName: 'Test',
        username: 'test0',
        lastName: 'Testing',
        email: 'testing@gmail.com',
        address: '1111 Test Dr',
        address2: 'APT 100',
        city: 'TestCity',
        state: 'TX',
        zip: '7777',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('u');
    done();
  });

  it('POST: Add product to cart', async (done) => {
    const res = await agent
      .post('/user/addProductToCart')
      .send({
        productID,
        quantity: 10,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch('Product added successfully');
    done();
  });

  it('PUT: Update product to cart', async (done) => {
    const res = await agent
      .put('/user/updateFromCart')
      .send({
        productID,
        quantity: 50,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch('Product Updated');
    done();
  });

  // it('PUT(FAIL): Fail to update product to cart', async (done) => {
  //   const res = await agent
  //     .put('/user/updateFromCart')
  //     .send({
  //       productID: '5e7a245a8c61833fc8c2a770',
  //       quantity: 50,
  //     });

  //   expect(res.statusCode).toEqual(201);
  //   expect(res.body.message).toMatch('Product Updated');
  //   done();
  // });

  it('PUT: Update product to cart to empty product', async (done) => {
    const res = await agent
      .put('/user/updateFromCart')
      .send({
        productID,
        quantity: 0,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toMatch('Product Updated');
    done();
  });


  it('POST: LOGOUT USER', async (done) => {
    const res = await agent
      .delete('/user/logout');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    done();
  });

  it('GET: GET ALL PRODUCTS', async (done) => {
    const res = await agent
      .get('/product/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('products');
    done();
  });

  it('GET: GET A SPECIFIC PRODUCTS', async (done) => {
    const res = await agent
      .get(`/product/${productID}/`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('product');
    done();
  });
});

// afterEach(async () => {
//   await removeAllCollections();
// });

afterAll(async () => {
  await dropAllCollections();
  await mongoose.connection.close();
});
