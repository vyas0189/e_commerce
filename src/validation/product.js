import Joi from '@hapi/joi';
import objectId from 'joi-objectid';

Joi.objectId = objectId(Joi);

const id = Joi.objectId().required();
const name = Joi.string().min(3).required();
const productType = Joi.string().valid('shoes', 'women', 'men', 'teen', 'kid').required();
const quantity = Joi.number().integer().required();
const price = Joi.number().required();
const image = Joi.string().required();

export const productSchema = Joi.object({
    name, productType, quantity, price, image,
});

export const productIDSchema = Joi.object({
    id,
});
