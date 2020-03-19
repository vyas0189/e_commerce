import { Router } from 'express';
import User from '../models/User';
import { signUp } from '../validation';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        await signUp.validateAsync(req.body, { abortEarly: false });
        const {
            email, firstName, lastName, address, username, password, city, state, zip, address2, role,
        } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res
                .status(500)
                .json({ errors: [{ msg: 'User already exists' }] });
        }
        user = new User({
            email, firstName, lastName, address, username, password, city, state, zip, address2, role,
        });
        await user.save();

        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).send({ errors: [{ err }] });
    }
});

export default router;
