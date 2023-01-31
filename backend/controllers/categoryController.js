const Category = require('../models/category');
const catchAsyncError = require('../Middleware/catchAsyncErrors');
// const ErrorHandler = require('../utils/errorhandler');

exports.getCategory = catchAsyncError(async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

exports.updateCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateCat = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCat);
  } catch (error) {
    throw new Error(error);
  }
});

exports.deleteCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteCat = await Category.findByIdAndDelete(id);

    res.json(deleteCat);
  } catch (error) {
    throw new Error(error);
  }
});

exports.getAllCategory = catchAsyncError(async (req, res, next) => {
  try {
    const allCat = await Category.find();
    res.json(allCat);
  } catch (error) {
    throw new Error(error);
  }
});
