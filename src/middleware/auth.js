/* eslint-disable import/named */
import { isAdmin, isLoggedIn } from '../auth';
import { BadRequest, Unauthorized } from '../errors';

export const guest = (req, res, next) => {
    if (isLoggedIn(req)) {
        return next(new BadRequest('You are already logged in'));
    }
    next();
};

export const auth = (req, res, next) => {
    if (!isLoggedIn(req)) {
        return next(new Unauthorized('You must be logged in'));
    }

    next();
};

export const admin = async (req, res, next) => {
    if (!(await isAdmin(req))) {
        return next(new Unauthorized('Not Authorized!'));
    }
    next();
};
