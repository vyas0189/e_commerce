import { Router } from 'express';
import { logIn, logOut } from '../auth';
import { auth, catchAsync, guest } from '../middleware';
import Product from '../models/Product';
import User from '../models/User';
import { loginSchema, signUpSchema, updateUserSchema } from '../validation';

const router = Router();

router.get('/me', auth, catchAsync(async (req, res) => {
    await User.findById(req.session.userId).populate('populate').exec((err, data) => {
        if (err) {
            return res.status(401).json({ message: 'Cannot find user' });
        }
        return res.status(200).json({ message: 'OK', data });
    });
}));

router.post('/register', guest, catchAsync(async (req, res) => {
    await signUpSchema.validateAsync(req.body, { abortEarly: false });
    const {
        email, firstName, lastName, address, username, password, city, state, zip, address2, role,
    } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return res
            .status(500)
            .json({ message: 'User already exists' });
    }
    user = await User.create({
        email, firstName, lastName, address, username, password, city, state, zip, address2, role,
    });

    logIn(req, user.id);
    return res.status(200).json({ message: 'OK', user });
}));

router.post('/login', guest, catchAsync(async (req, res) => {
    await loginSchema.validateAsync(req.body, { abortEarly: false });

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Incorrect email or password' });
    }

    logIn(req, user.id);

    res.json({ message: 'OK', user: user.id });
}));

router.delete('/logout', auth, catchAsync(async (req, res) => {
    await logOut(req, res);
    return res.status(200).json({ message: 'OK' });
}));

router.put('/update', auth, catchAsync(async (req, res) => {
    await updateUserSchema.validateAsync(req.body, { abortEarly: false });
    const {
        email, firstName, lastName, address, username, password, city, state, zip, address2,
    } = req.body;
    const { userId } = req.session;
    const user = User.findById(userId);
    if (user) {
        const u = await User.findOneAndUpdate({ _id: userId }, {
            $set: {
                email, firstName, lastName, address, username, password, city, state, zip, address2,
            },
        });
        return res.status(200).json({ message: 'OK', u });
    }
}));

router.post('/addProductToCart', auth, catchAsync(async (req, res) => {
    const { productID, quantity } = req.body;
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
                await User.findOneAndUpdate({ _id: user.id }, {
                    $set: {
                        products: [...products, {
                            productID,
                            quantity,
                        }],
                    },
                });
            }
            return res.status(200).json({ message: 'Product added successfully' });
        }
    }
}));

router.put('/updateFromCart', auth, catchAsync(async (req, res) => {
    const { userId } = req.session;
    const { productID, quantity } = req.body;
    const user = await User.findOne({ _id: userId, 'products.productID': productID });

    if (user) {
        const product = await Product.findById(productID);

        if (product) {
            await User.findOneAndUpdate({ _id: userId, 'products.productID': productID }, { $set: { 'products.$.quantity': quantity } });
            if (quantity <= 0) {
                await User.updateOne({ _id: userId, 'products.productID': productID }, { $pull: { products: { productID } } });
            }
            return res.status(200).json({ message: 'Product Updated' });
        }
        // await User.updateOne({ _id: userId, 'products.productID': productID }, { $pull: { products: { productID } } });

        return res.status(201).json({ message: 'Unable to Update Product' });
    }
}));

router.get('/cart', auth, catchAsync(async (req, res) => {
    const user = await User.findById(req.session.userId);
    if (user) {
        await User.findOne({ _id: user.id }).populate('products.productID').exec((err, product) => {
            if (err) {
                return res.status(500).json({ message: 'Server Error' });
            }
            return res.status(200).json({ message: 'OK', cart: product.products });
        });
    }
}));

router.post('/checkout', auth, catchAsync(async (req, res) => {
    const user = await User.findById(req.session.userId);
    const err = [];
    if (user && user.products.length > 0) {
        await Promise.all(user.products.map(async (product) => {
            const p = await Product.findById(product.productID);

            if (p.quantity > 0 && (p.quantity - product.quantity) >= 0) {
                await Product.findOneAndUpdate({ _id: product.productID }, { $set: { quantity: p.quantity - product.quantity } });
                await User.updateOne({ _id: user.id, 'products._id': product.id }, { $pull: { products: { productID: product.productID } } });
            } else {
                return err.push(`Item, ${p.name}, is sold out, Quantity available: ${p.quantity}`);
            }
        }));

        if (err.length > 0) {
            return res.status(201).json({ message: err });
        }

        return res.status(200).json({ message: 'OK' });
    }
    return res.status(200).json({ message: 'Empty cart' });
}));

export default router;
