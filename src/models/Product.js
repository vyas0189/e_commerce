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
});

const Product = mongoose.model('product', productSchema);

export default Product;
