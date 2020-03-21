import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    productType: {
        type: String,
        enum: ['shoes', 'women', 'men', 'teen', 'kid'],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

productSchema.set('toJSON', {
    transform: (doc, { __v, ...rest }) => rest,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
