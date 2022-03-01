const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 10,
    required: true,
  },
  mail: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  text: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  status: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
});

module.exports = mongoose.model('items', itemSchema);