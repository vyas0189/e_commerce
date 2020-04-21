import { Router } from 'express';
import { admin, catchAsync } from '../middleware';
import Product from '../models/Product';
import {
 productIDSchema, productSchema, productTypeSchema, productUpdateSchema,
} from '../validation';

const router = Router();

router.get('/', catchAsync(async (req, res) => {
    const products = await Product.find();
    res.json({ message: 'OK', products });
}));

router.get('/:productID', catchAsync(async (req, res) => {
    await productIDSchema.validateAsync(req.params, { abortEarly: false });
    const product = await Product.findById(req.params.productID);
    if (!product) {
        return res.status(400).json({ message: 'Product not found' });
    }
    return res.json({ message: 'OK', product });
}));

router.post('/', admin, catchAsync(async (req, res) => {
    await productSchema.validateAsync(req.body, { abortEarly: false });
    const {
        name, productType, price, image, quantity, description,
    } = req.body;

    const product = await Product.create({
        name, productType, price, image, quantity, description,
    });

    return res.json({ message: 'OK', product });
}));

router.put('/', admin, catchAsync(async (req, res) => {
    await productUpdateSchema.validateAsync(req.body, { abortEarly: false });
    const {
        productID, name, productType, price, image, quantity, description,
    } = req.body;
    const p = {
        name, productType, price, image, quantity, description,
    };
    const product = Product.findById(productID);
    if (product) {
        const pro = await Product.findOneAndUpdate({ _id: productID }, { $set: p });
        if (!pro) {
            return res.status(404).json({ message: 'Product Not Found' });
        }
        return res.status(200).json({ message: 'OK', product: pro });
    }
}));

router.delete('/:productID', admin, catchAsync(async (req, res) => {
    await productIDSchema.validateAsync(req.params, { abortEarly: false });
    const { productID } = req.params;
    const product = Product.findById(productID);
    if (product) {
        const p = await Product.findByIdAndRemove({ _id: productID });
        return res.status(200).json({ message: 'OK', p });
    }
}));

router.get('/category/:productType', catchAsync(async (req, res) => {
    await productTypeSchema.validateAsync(req.params, { abortEarly: false });
    const { productType } = req.params;
    const product = await Product.find({ productType });
    res.status(200).json({ message: 'OK', product });
}));
export default router;
