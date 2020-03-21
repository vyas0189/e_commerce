import { Router } from 'express';
import { admin, catchAsync } from '../middleware';
import Product from '../models/Product';
import { productSchema, validate } from '../validation';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/:product_id', catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.product_id);
    if (!product) {
        return res.status(400).json({ msg: 'Product not found' });
    }
    res.json(product);
}));

router.post('/add', admin, catchAsync(async (req, res) => {
    await validate(productSchema, req.body);
    const {
        name, productType, price, image, quantity,
    } = req.body;

    const product = await Product.create({
        name, productType, price, image, quantity,
    });

    res.json({ message: 'OK', product });
}));

export default router;
