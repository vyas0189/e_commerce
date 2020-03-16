import cors from 'cors';
import 'dotenv/config';
import express, { json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { APP_PORT } from './config';

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
app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    });
});

app.listen(APP_PORT, () => {
    console.log(`http://localhost:${APP_PORT}`);
})