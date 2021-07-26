const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: { type: String, required: true },
    content: String,
}, { timestamps: true, versionKey: false });

const bookSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    userId: { type: String, required: true },
    articles: { type: [articleSchema], default: [] }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Book', bookSchema);
