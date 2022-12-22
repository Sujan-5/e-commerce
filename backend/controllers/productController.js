const Product = require('../models/product');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../Middleware/catchAsyncErrors');

//create new product = /api/v1/product/new for ADMIN
exports.newProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//Get all products => /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    sucess: true,
    count: products.length,
    products,
  });
});

//update Products (ADMIN)
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    sucess: true,
    product,
  });
});

//Delete product details
exports.singleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete product details
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product Deleted Sucessfully',
  });
});
