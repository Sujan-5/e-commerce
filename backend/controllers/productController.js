const Product = require('../models/product');
const Category = require('../models/category');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../Middleware/catchAsyncErrors');
const features = require('../utils/features');
const slugify = require('slugify');

//create new product = /api/v1/product/new for ADMIN **************************************************************************************************************
exports.newProduct = catchAsyncError(async (req, res, next) => {
  const { name, price, description, category, stock, images } = req.body;

  const categoryDoc = await Category.findOne({ title: category });
  if (!categoryDoc) {
    return res.status(404).json({
      message: `Category "${category}" not found`,
    });
  }

  const product = new Product({
    name,
    slug: slugify(name),
    price,
    description,
    category: categoryDoc._id,
    stock,
    images,
  });

  try {
    const result = await product.save();
    res.status(201).json({
      message: 'Product created successfully',
      product: result,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: 'Product creation failed',
      error: error,
    });
  }
});

//Get all products => /api/v1/products **************************************************************************************************************
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 16;
  const productsCount = await Product.countDocuments();

  const keyFeature = new features(Product.find(), req.query).search().filter();

  let products = await keyFeature.query;

  keyFeature.pagination(resPerPage);

  let productFilteredCount = products.length;

  res.status(200).json({
    sucess: true,
    products,
    productsCount,
    resPerPage,
    productFilteredCount,
  });
});

// Get all ADMIN products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    sucess: true,
    products,
  });
});

//update Products (ADMIN)**************************************************************************************************************
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
    success: true,
    product,
  });
});

//single product details **************************************************************************************************************
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

//Delete product details **************************************************************************************************************
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
