/* eslint-disable import/no-named-default */
import connectMongo from 'connect-mongo';
import cors from 'cors';
import express, { json } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { join, resolve } from 'path';
import address from '../routes/address';
import product from '../routes/product';
import user from '../routes/user';

const TWO_HOUR = 1000 * 60 * 60 * 2;
const MongoStore = connectMongo(session);

export const {
    PORT = 4000,
    NODE_ENV = 'development',
    MONGO_HOST = 'localhost',
    MONGO_PORT = 27017,
    MONGO_DATABASE = 'ecommerce',
    ADDRESS_URL,
    ADDRESS_ACCESS_LICENSE_NUMBER,
    ADDRESS_USERNAME,
    ADDRESS_PASSWORD,
    SESSION_SECRET = 'please keep this secret, mate',
    SESSION_NAME = 'sid',
    SESSION_IDLE_TIMEOUT = TWO_HOUR,

} = process.env;

export const IN_PROD = NODE_ENV === 'production';

export const MONGO_URI = IN_PROD ? process.env.MONGO_URI : `mongodb://${MONGO_HOST}/${MONGO_DATABASE}`;

export const SESSION_OPTIONS = {
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    cookie: {
        maxAge: +SESSION_IDLE_TIMEOUT,
        sameSite: true,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
};

const app = express();
app.use(cors({ origin: IN_PROD ? 'https://e-commerce-software-eng.herokuapp.com/' : '*' }));
app.use(morgan('common'));
app.use(helmet());
app.use(json({ extended: false }));
app.use(session({ ...SESSION_OPTIONS }));


app.get('/api', (req, res) => {
    res.json({ welcome: 'E-Commerce 🛒' });
});

app.use('/api/product', product);
app.use('/api/address', address);
app.use('/api/user', user);

if (IN_PROD) {
    app.use(express.static(join(__dirname, '../../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(resolve(__dirname, '../../client/build', 'index.html'));
    });
}

export default app;
