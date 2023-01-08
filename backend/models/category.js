const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter Category'],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Category', categorySchema);
