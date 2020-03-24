import { SESSION_NAME } from './config';
import User from './models/User';

export const isLoggedIn = (req) => !!req.session.userId;

export const logIn = (req, userId) => {
    req.session.userId = userId;
};

export const logOut = (req, res) => new Promise((resolve, reject) => {
    req.session.destroy((err) => {
        if (err) {
            reject(err);
        }

        res.clearCookie(SESSION_NAME);

        resolve();
    });
});

export const isAdmin = async (req) => {
    if (req.session.userId) {
        const user = await User.findById(req.session.userId);
        if (user) {
            return user.role === 'admin';
        }
    }
};
