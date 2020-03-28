import { Joi } from './joi';

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
const password = Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).required();

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

export const signUpSchema = Joi.object({
    email, firstName, lastName, address, username, password, city, state, zip, address2, role,
});

export const updateUserSchema = Joi.object({
    email, firstName, lastName, address, username, city, state, zip, address2,
});

export const loginSchema = Joi.object({
    username,
    password,
});
