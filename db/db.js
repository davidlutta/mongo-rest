const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.DATABASE_NAME,
    useNewUrlParser: true,
}, err => err ? console.log(err.message) : console.log("Connected to Database"));
