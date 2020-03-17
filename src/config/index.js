export const {
    APP_PORT = 4000,
    NODE_ENV = 'development',
    MONGO_HOST = 'localhost',
    MONGO_PORT = 27017,
    MONGO_DATABASE = 'ecommerce',
} = process.env;

export const IN_PROD = NODE_ENV === 'production';

export const MONGO_URI = IN_PROD ? process.env.MONGO_URI : `mongodb://${MONGO_HOST}/${MONGO_DATABASE}`;