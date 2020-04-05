import 'dotenv/config';
import mongoose from 'mongoose';
import app, { MONGO_URI, NODE_ENV, PORT } from './config';

(async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }, () => {
            console.log('Database Connected');
        });

        app.listen(PORT, () => {
            console.log(`NODE_ENV: ${NODE_ENV}`);

            console.log(`http://localhost:${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
})();
