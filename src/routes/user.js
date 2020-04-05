import { Router } from 'express';
import { logIn, logOut } from '../auth';
import { admin, catchAsync, guest } from '../middleware';
import Product from '../models/Product';
import User from '../models/User';
import { loginSchema, signUpSchema, validate } from '../validation';

const router = Router();

router.get('/me', admin, catchAsync(async (req, res) => {
    try {
        const adminUser = await User.findById(req.session.userId);
        if (adminUser) {
            return res.status(200).json({ message: 'OK', user: adminUser });
        }
        return res.status(403).json({ message: 'Not Found' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
}));

router.post('/register', guest, catchAsync(async (req, res) => {
    await validate(signUpSchema, req.body, req, res);
    const {
        username, password, role,
    } = req.body;

    let user = await User.findOne({ username });

    if (user) {
        return res
            .status(500)
            .json({ message: 'User already exists' });
    }
    user = await User.create({
        username, password, role,
    });

    logIn(req, user.id);
    return res.status(200).json({ message: 'OK', user });
}));

router.post('/login', guest, catchAsync(async (req, res) => {
    await validate(loginSchema, req.body, req, res);

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Incorrect email or password' });
    }

    logIn(req, user.id);

    res.json({ message: 'OK', user: user.id });
}));

router.delete('/logout', admin, catchAsync(async (req, res) => {
    await logOut(req, res);
    return res.status(200).json({ message: 'OK' });
}));

router.post('/checkout', catchAsync(async (req, res) => {
    const err = [];
    const { products } = req.body;
    await Promise.all(products.map(async (product) => {
        const p = await Product.findById(product.productID);

        if (p.quantity > 0 && (p.quantity - product.quantity) >= 0) {
            await Product.findOneAndUpdate({ _id: product.productID }, { $set: { quantity: p.quantity - product.quantity } });
        } else {
            return err.push(`Item, ${p.name}, is sold out, Quantity available: ${p.quantity}`);
        }
    }));

    if (err.length > 0) {
        return res.status(201).json({ message: err });
    }

    return res.status(200).json({ message: 'OK' });
}));

export default router;
