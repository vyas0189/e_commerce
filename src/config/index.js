export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',
  MONGO_URI,
  MONGO_HOST = 'localhost',
  MONGO_PORT = 27017,
  MONGO_DATABASE = 'ecommerce',
} = process.env;

export const IN_PROD = NODE_ENV === 'production';
