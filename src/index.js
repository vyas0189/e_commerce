import 'dotenv/config';
import mongoose from 'mongoose';
import app, { IN_PROD, MONGO_URI, PORT } from './config';

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
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
})();
