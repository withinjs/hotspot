

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const newsSchema = new Schema({
    url: { type: String },
    title: { type: String },
    source: { type: String },
    update_time: { type: Date, default: Date.now },
})

const NewsModel = mongoose.model('NewsModel', newsSchema);

module.exports = NewsModel
