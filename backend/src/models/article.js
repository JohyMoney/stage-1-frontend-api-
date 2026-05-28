const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: 'Invalid URL format',
      },
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: 'Invalid URL format',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('article', articleSchema);
