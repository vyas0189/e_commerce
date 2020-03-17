import 'dotenv/config';
import mongoose from 'mongoose';
import app, { APP_PORT, IN_PROD, MONGO_URI } from './config';

(async () => {
    try {
        if (IN_PROD) {
            await mongoose.connect(MONGO_URI, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            });
            console.log('Database Connected');
        } else {
            await mongoose.connect(MONGO_URI, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            });
            console.log('Database Connected!');
        }
    } catch (err) {
        console.log(err);
    }
    app.listen(APP_PORT, () => {
        console.log(`http://localhost:${APP_PORT}`);
    });
})();
