const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: { type: String, required: true },
    content: String,
    bookId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true, versionKey: false });

const bookSchema = new Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    articles: { type: [articleSchema], default: [] }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Book', bookSchema);
