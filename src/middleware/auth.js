import { isAdmin, isLoggedIn } from '../auth';

export const guest = (req, res, next) => {
    if (isLoggedIn(req)) {
        return res.status(401).json({ message: 'You are already logged in' });
    }
    next();
};

export const auth = (req, res, next) => {
    if (!isLoggedIn(req)) {
        return res.status(401).json({ message: 'You must be logged in' });
    }

    next();
};

export const admin = async (req, res, next) => {
    if (!(await isAdmin(req))) {
        return res.status(401).json({ message: 'Not Authorized!' });
    }
    next();
};
