import { Joi } from './joi';

const productID = Joi.objectId().required();
const name = Joi.string().min(3).required();
const productType = Joi.string().valid('shoes', 'women', 'men', 'teen', 'kid').required();
const quantity = Joi.number().integer().required();
const description = Joi.string().required();
const price = Joi.number().required();
const image = Joi.string().required();

export const productSchema = Joi.object({
    name, productType, quantity, price, image, description,
});

export const productIDSchema = Joi.object({
    productID,
});

export const productUpdateSchema = Joi.object({
    productID, name, productType, quantity, price, image, description,
});

export const productTypeSchema = Joi.object({
    productType,
});
