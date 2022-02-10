const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mongo:mongo-12345@cluster0.klysk.mongodb.net/Recipes?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected..');
})


require('./category');
require('./recipe');
