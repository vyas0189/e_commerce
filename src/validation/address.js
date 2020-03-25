import { Joi } from './joi';

const address = Joi
    .string()
    .trim()
    .regex(/^[a-z\d\s\-.,]*$/i)
    .max(100)
    .required();

const city = Joi.string().trim().required();
const state = Joi.string().min(2).required();
const zip = Joi.number().min(4).required();
const address2 = Joi.string().trim();

export const addressValidator = Joi.object().keys({
    address, city, state, zip, address2,
});
