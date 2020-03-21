import { Router } from 'express';
import { logIn, logOut } from '../auth';
import { auth, catchAsync, guest } from '../middleware';
import User from '../models/User';
import { loginSchema, signUp, validate } from '../validation';

const router = Router();

router.get('/me', auth, catchAsync(async (req, res) => {
    await User.findById(req.session.userId).populate('populate').exec((err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
}));

router.post('/register', guest, catchAsync(async (req, res) => {
    await validate(signUp, req.body);
    const {
        email, firstName, lastName, address, username, password, city, state, zip, address2, role,
    } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return res
            .status(500)
            .json({ error: { msg: 'User already exists' } });
    }
    user = await User.create({
        email, firstName, lastName, address, username, password, city, state, zip, address2, role,
    });

    logIn(req, user.id);
    res.json({ message: 'OK', user });
}));

router.post('/login', guest, catchAsync(async (req, res) => {
    await validate(loginSchema, req.body);

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
        res.send('Incorrect email or password');
    }

    logIn(req, user.id);

    res.json({ message: 'OK' });
}));

router.get('/logout', auth, catchAsync(async (req, res) => {
    await logOut(req, res);
    res.status(200).json({ message: 'OK' });
}));

export default router;
