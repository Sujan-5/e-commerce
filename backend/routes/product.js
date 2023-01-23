const router = require('express').Router();

const {
  getProducts,
  newProduct,
  deleteProduct,
  updateProduct,
  singleProduct,
  getAdminProducts,
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../Middleware/authe');

router.route('/products').get(getProducts);

// router.post(
//   '/admin/product/new',
//   isAuthenticatedUser,
//   authorizeRoles('admin'),
//   newProduct
// );

router.route('/admin/products').get(getAdminProducts);

router
  .route('/admin/product/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);

router
  .route('/admin/product/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.route('/product/:id').get(singleProduct);

module.exports = router;
