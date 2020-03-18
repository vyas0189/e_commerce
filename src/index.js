import 'dotenv/config';
import mongoose from 'mongoose';
import app, { MONGO_URI, PORT } from './config';

(async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, () => {
            console.log('Database Connected');
        });
    } catch (err) {
        console.log(err);
    }
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
})();
