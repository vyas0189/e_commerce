import { Joi } from './joi';

const username = Joi.string().alphanum().min(3).max(30)
    .required();
const password = Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).required();

const role = Joi.string().required();

export const signUpSchema = Joi.object({
    username, password, role,
});

export const updateUserSchema = Joi.object({
    username, password,
});

export const loginSchema = Joi.object({
    username,
    password,
});
