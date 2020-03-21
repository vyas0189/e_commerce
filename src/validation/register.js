import Joi from '@hapi/joi';

const email = Joi.string().email().min(8).max(245)
    .lowercase()
    .trim()
    .required();
const firstName = Joi.string().min(3).max(128).trim()
    .required();
const lastName = Joi.string().min(3).max(128).trim()
    .required();
const username = Joi.string().alphanum().min(3).max(30)
    .required();
const password = Joi.string().min(8).max(50).regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/)
    .required();

const address = Joi
    .string()
    .trim()
    .regex(/^[a-z\d\s\-.,]*$/i)
    .max(100)
    .required();

const city = Joi.string().trim().required();
const state = Joi.string().min(2).required();
const zip = Joi.number().min(4).required();
const role = Joi.string().required();
const address2 = Joi.string().trim();
export const signUp = Joi.object().keys({
    email, firstName, lastName, address, username, password, city, state, zip, address2, role,
});


export const loginSchema = Joi.object({
    username,
    password,
});
