import { Router } from 'express';
import { admin, catchAsync } from '../middleware';
import Product from '../models/Product';
import {
 productIDSchema, productSchema, productTypeSchema, productUpdateSchema, validate,
} from '../validation';

const router = Router();

router.get('/', catchAsync(async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ message: 'OK', products });
    } catch (err) {
        return res.status(500).json({ message: 'Server Error' });
    }
}));

router.get('/:productID', catchAsync(async (req, res) => {
    await validate(productIDSchema, req.params, req, res);
    const product = await Product.findById(req.params.productID);
    if (!product) {
        return res.status(400).json({ message: 'Product not found' });
    }
    return res.json({ message: 'OK', product });
}));

router.post('/', admin, catchAsync(async (req, res) => {
    await validate(productSchema, req.body, req, res);
    const {
        name, productType, price, image, quantity, description,
    } = req.body;

    const product = await Product.create({
        name, productType, price, image, quantity, description,
    });

    return res.json({ message: 'OK', product });
}));

router.put('/', admin, catchAsync(async (req, res) => {
    await validate(productUpdateSchema, req.body, req, res);
    const {
        productID, name, productType, price, image, quantity, description,
    } = req.body;
    const p = {
        name, productType, price, image, quantity, description,
    };
    const product = Product.findById(productID);
    if (product) {
        const pro = await Product.findOneAndUpdate({ _id: productID }, { $set: p });
        return res.status(200).json({ message: 'OK', pro });
    }
    return res.status(500).json({ message: 'Server Error' });
}));

router.delete('/:productID', admin, catchAsync(async (req, res) => {
    await validate(productIDSchema, req.params, req, res);
    const { productID } = req.params;
    const product = Product.findById(productID);
    if (product) {
        const p = await Product.findByIdAndRemove({ _id: productID });
        return res.status(200).json({ message: 'OK', p });
    }
    return res.status(500).json({ message: 'Server Error' });
}));

router.get('/category/:productType', catchAsync(async (req, res) => {
    await validate(productTypeSchema, req.params, req, res);
    const { productType } = req.params;
    const product = await Product.find({ productType });
    res.status(200).json({ message: 'OK', product });
}));
export default router;
