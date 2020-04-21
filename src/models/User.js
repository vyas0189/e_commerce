import { compare, hash } from 'bcryptjs';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        validate: {
            validator: (email) => User.doesNotExist({ email }),
            message: 'Email already exists',
        },
        required: true,
    },
    username: {
        type: String,
        validate: {
            validator: (username) => User.doesNotExist({ username }),
            message: 'Username already exists',
        },
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    products: [
        {
            productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
        },
    ],
}, {
    timestamps: true,
});

UserSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 10);
    }
});

UserSchema.methods.comparePassword = async function (password) {
    return compare(password, this.password);
};

UserSchema.set('toJSON', {
    transform: (doc, { __v, password, ...rest }) => rest,
});

UserSchema.statics.doesNotExist = async function (field) {
    return await this.where(field).countDocuments() === 0;
};

const User = mongoose.model('User', UserSchema);

export default User;
