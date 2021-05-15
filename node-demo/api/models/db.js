require('./users');
require('./products');
require('./carts');
const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/demoTest';

mongoose.set('useCreateIndex', true);
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});