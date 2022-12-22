const Product = require('../models/product');

//create new product = /api/v1/product/new for ADMIN
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

//Get all products => /api/v1/products
exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    sucess: true,
    count: products.length,
    products,
  });
};

//update Products (ADMIN)
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      sucess: false,
      message: 'Product Not found',
    });
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
};

//Delete product details
exports.singleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'product not found',
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
};

//Delete product details
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'product not found',
    });
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product Deleted Sucessfully',
  });
};
