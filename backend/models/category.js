const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter Category'],
      unique: true,
    },
    slug: {
      type: String,
      slug: 'title',
      required: true,
      unique: true,
    },
    parentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Category', categorySchema);
