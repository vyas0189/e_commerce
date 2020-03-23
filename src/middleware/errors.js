export const catchAsync = (handler) => (...args) => handler(...args).catch(args[2]);

export const notFound = (req, res) => res.status(404).json({ message: 'Not Found' });

export const serverError = (err, req, res) => {
    if (!err.status) {
        res.status(500).json({ message: 'Server Error' });
    }

    res.status(err.status || 500)
        .json({ message: err.message || 'Internal Server Error' });
};
