import cors from 'cors';
import 'dotenv/config';
import express, { json } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { APP_PORT, IN_PROD, MONGO_URI } from './config';

(async () => {
  try {
    if (IN_PROD) {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
      console.log('PROD Database Connected');
    } else {
      await mongoose.connect('mongodb://localhost/ecommerce', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
      console.log('Database Connected!');
    }
  } catch (err) {
    console.log(err);
  }

  const app = express();
  app.use(cors());
  app.use(morgan('common'));
  app.use(helmet());
  app.use(json({ extended: false }));

  app.get('/', (req, res) => {
    res.json({ welcome: 'CougarCS Backend 🐯' });
  });

  app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  });
  app.use((error, req, res) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: error.message,
      stack: IN_PROD ? '🥞' : error.stack,
    });
  });

  app.listen(APP_PORT, () => {
    console.log(`http://localhost:${APP_PORT}`);
  });
})();
