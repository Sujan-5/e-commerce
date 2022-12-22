const router = require('express').Router();

const {
  getProducts,
  newProduct,
  deleteProduct,
  updateProduct,
  singleProduct,
} = require('../controllers/productController');

router.route('/products').get(getProducts);

router.route('/product/new').post(newProduct);

router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);
router.route('/product/:id').get(singleProduct);

module.exports = router;
