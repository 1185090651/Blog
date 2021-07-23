const mongoose = require('mongoose');
const app = require('./server.js');

const db = 'mongodb+srv://root:root@cluster0.93mkf.mongodb.net';
const PORT = process.env.PORT || 9527;

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('mongoose connected ...');
    })
    .catch(err => {
        console.log(err);
    });
(async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            dbName: 'test'
        });
        app.listen(PORT, () => {
            console.log('server is running at http://localhost:9527');
        });
    } catch (err) {
        console.log(err);
    }
})();
