const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const post = new mongoose.Schema({
    title: String,
    body: String,
    timestamp: Date
});
post.plugin(mongoosePaginate);
module.exports =  mongoose.model('post', post);
