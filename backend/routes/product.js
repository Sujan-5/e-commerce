const router = require('express').Router();

const {
  getProducts,
  newProduct,
  deleteProduct,
  updateProduct,
  singleProduct,
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../Middleware/authe');

router.route('/products').get(getProducts);

router
  .route('/product/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

router
  .route('/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router
  .route('/product/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route('/product/:id').get(singleProduct);

module.exports = router;
