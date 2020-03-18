import { compare, hash } from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
            validator: (email) => User.doesntExist({ email }),
            message: ({ value }) => `Email ${value} has already been taken`,
        },
    },
    username: {
        type: String,
        validate: {
            validator: (username) => User.doesntExist({ username }),
            message: ({ value }) => `Username ${value} has already been taken`,
        },
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
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
}, {
    timestamps: true,
});

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 10);
    }
});

userSchema.statics.doesntExist = async function (options) {
    return await this.where(options).countDocuments() === 0;
};

userSchema.methods.matchesPassword = async function (password) {
    return compare(password, this.password);
};
const User = mongoose.model('user', userSchema);

export default User;
