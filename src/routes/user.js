import { Router } from 'express';
import { logIn, logOut } from '../auth';
import { auth, catchAsync, guest } from '../middleware';
import Product from '../models/Product';
import User from '../models/User';
import { loginSchema, signUp, validate } from '../validation';

const router = Router();

router.get('/me', auth, catchAsync(async (req, res) => {
    await User.findById(req.session.userId).populate('populate').exec((err, data) => {
        if (err) {
            res.status(401).json({ message: 'Cannot find user' });
        }
        res.status(200).json(data);
    });
}));

router.post('/register', guest, catchAsync(async (req, res) => {
    await validate(signUp, req.body, req, res);
    const {
        email, firstName, lastName, address, username, password, city, state, zip, address2, role,
    } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return res
            .status(500)
            .json({ error: 'User already exists' });
    }
    user = await User.create({
        email, firstName, lastName, address, username, password, city, state, zip, address2, role,
    });

    logIn(req, user.id);
    res.status(200).json({ message: 'OK', user });
}));

router.post('/login', guest, catchAsync(async (req, res) => {
    await validate(loginSchema, req.body, req, res);

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
        res.status(401).json({ message: 'Incorrect email or password' });
    }

    logIn(req, user.id);

    res.json({ message: 'OK', user: user.id });
}));

router.delete('/logout', auth, catchAsync(async (req, res) => {
    await logOut(req, res);
    res.status(200).json({ message: 'OK' });
}));

router.post('/addProductToCart', auth, catchAsync(async (req, res) => {
    const { productID, quantity } = req.body.cart;
    const user = await User.findById(req.session.userId);
    const product = await Product.findById(productID);

    if (user) {
        if (product && product.quantity > 0) {
            const getProduct = user.products.find((p) => p.productID.equals(productID));

            if (getProduct) {
                const item = getProduct.productID;
                const itemQuantity = getProduct.quantity + quantity;
                await User.updateOne({ _id: user.id, 'products.productID': item }, { $set: { 'products.$.quantity': itemQuantity } });
            } else {
                const { products } = user;
                await User.findOneAndUpdate({ _id: user.id }, { $set: { products: [...products, req.body.cart] } });
            }
            return res.status(200).json({ message: 'Product added successfully' });
        }
    }
    return res.status(500).json({ message: 'Unable to add product' });
}));

router.get('/cart', auth, catchAsync(async (req, res) => {
    const user = await User.findById(req.session.userId);
    if (user) {
        await User.findOne({ _id: user.id }).populate('products.productID').exec((err, product) => {
            if (err) {
                return res.status(500).json({ message: 'Unable to get cart' });
            }
            return res.status(200).json({ message: 'OK', cart: product.products });
        });
    }
}));

router.post('/checkout', auth, catchAsync(async (req, res) => {
    const user = await User.findById(req.session.userId);
    const err = [];
    if (user && user.products.length > 0) {
        user.products.map(async (product) => {
            const p = await Product.findById(product.productID);

            if (p.quantity > 0 && (p.quantity - product.quantity) >= 0) {
                await Product.findOneAndUpdate({ _id: product.productID }, { $set: { quantity: p.quantity - product.quantity } });
                await User.updateOne({ _id: user.id, 'products._id': product.id }, { $pull: { products: { productID: product.productID } } });
            } else {
                return err.push(`Item, ${p.name}, is sold out`);
            }
        });

        if (err.length > 0) {
            console.log('EEEEEE');

            return res.status(201).json({ message: err });
        }

        return res.status(200).json({ message: 'OK' });
    }
    return res.status(200).json({ message: 'Empty cart' });
}));

export default router;
