const Product = require('../models/product');
const dotenv = require('dotenv');
const connection = require('../database');

const products = require('../data/product.json');

dotenv.config({ path: 'backend/.env' });

connection();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('Product are deleted');

    await Product.insertMany(products);
    console.log('All products are added');

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
