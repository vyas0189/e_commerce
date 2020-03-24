import joi from '@hapi/joi';
import mongoose from 'mongoose';

const objectId = (j) => ({
    type: 'objectId',
    base: j.string(),
    messages: {
        objectId: '"{#label}" is not a valid ID',
    },
    validate(value, helpers) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return { value, errors: helpers.error('objectId') };
        }
    },
});


export const Joi = joi.extend(objectId);

export const validate = async (schema, payload, req, res) => {
    try {
        await schema.validateAsync(payload, { abortEarly: false });
    } catch (e) {
        return res.status(500).json({ message: 'Unable to validate', e });
    }
};
