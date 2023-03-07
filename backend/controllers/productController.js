const Product = require('../models/product');
const Category = require('../models/category');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../Middleware/catchAsyncErrors');
const features = require('../utils/features');
const slugify = require('slugify');
// const Stock = require('../models/stock');

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
      success: true,
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

//try for stock
// exports.newProduct = catchAsyncError(async (req, res, next) => {
//   const { name, price, description, category, stock, images } = req.body;

//   const categoryDoc = await Category.findOne({ title: category });
//   if (!categoryDoc) {
//     return res.status(404).json({
//       message: `Category "${category}" not found`,
//     });
//   }

//   const product = new Product({
//     name,
//     slug: slugify(name),
//     price,
//     description,
//     category: categoryDoc._id,
//     stock,
//     images,
//   });

//   try {
//     const result = await product.save();
//     const stockHistory = new StockHistory({
//       product: result._id,
//       quantity: stock,
//     });
//     await stockHistory.save();
//     res.status(201).json({
//       message: 'Product created successfully',
//       product: result,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({
//       message: 'Product creation failed',
//       error: error,
//     });
//   }
// });

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
  if (req.body.category) {
    const categoryDoc = await Category.findOne({ title: req.body.category });
    if (!categoryDoc) {
      return res.status(404).json({
        message: `Category "${req.body.category}" not found`,
      });
    }
    product.category = categoryDoc._id;
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

//for stock
// exports.updateProduct = catchAsyncError(async (req, res, next) => {
//   try {
//     const productId = req.params.productId;
//     const { addedQuantity } = req.body;
//     const product = await Product.findByIdAndUpdate(
//       productId,
//       { $inc: { stock: addedQuantity } },
//       { new: true }
//     );
//     const stockHistory = new Stock({
//       productId,
//       addedQuantity,
//     });
//     await stockHistory.save();
//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

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

//to get the stock history
// exports.getProductStockHistory = catchAsyncError(async (req, res, next) => {
//   try {
//     const productId = req.params.productId;
//     const stockHistory = await Stock.find({ productId })
//       .sort({ updatedAt: -1 })
//       .select('addedQuantity updatedAt -_id');
//     res.json(stockHistory);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });
