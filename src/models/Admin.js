import { compare, hash } from 'bcryptjs';
import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        validate: {
            validator: (username) => Admin.doesNotExist({ username }),
            message: 'Username already exists',
        },
        required: true,
    },
    role: {
        type: String,
        enum: ['admin'],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
});

AdminSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 10);
    }
});

AdminSchema.methods.comparePassword = async function (password) {
    return compare(password, this.password);
};

AdminSchema.set('toJSON', {
    transform: (doc, { __v, password, ...rest }) => rest,
});

AdminSchema.statics.doesNotExist = async function (field) {
    return await this.where(field).countDocuments() === 0;
};

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;
