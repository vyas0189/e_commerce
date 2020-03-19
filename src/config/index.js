import cors from 'cors';
import express, { json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { join } from 'path';
import { default as address, default as user } from '../routes';

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

} = process.env;

export const IN_PROD = NODE_ENV === 'production';

export const MONGO_URI = IN_PROD ? process.env.MONGO_URI : `mongodb://${MONGO_HOST}/${MONGO_DATABASE}`;

const app = express();
app.use(cors());
app.use(morgan('common'));
app.use(helmet());
app.use(json({ extended: false }));

if (IN_PROD) {
    app.use(express.static(join(__dirname, '../../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(join(__dirname, '../../client/build', 'index.html'));
    });
}

app.get('/', (req, res) => {
    res.json({ welcome: 'E-Commerce 🛒' });
});

app.use('/address', address);
app.use('/user', user);

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

export default app;
