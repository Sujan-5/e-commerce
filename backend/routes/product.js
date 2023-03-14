const router = require('express').Router();

const {
  getProducts,
  newProduct,
  deleteProduct,
  updateProduct,
  singleProduct,
  getAdminProducts,
  createNewReview,
  getAllProductReviews,
  deleteProductReview,
  updateProductStock,
  getProductId,
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../Middleware/authe');

router.route('/products').get(getProducts);

// router.post(
//   '/admin/product/new',
//   isAuthenticatedUser,
//   authorizeRoles('admin'),
//   newProduct
// );

router
  .route('/admin/products')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);

router
  .route('/admin/create/product')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);

router.route('/:id').get(getProductId);

router
  .route('/:id/stock')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProductStock);

router
  .route('/admin/product/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.route('/product/:id').get(singleProduct);

router.route('/review').put(isAuthenticatedUser, createNewReview);

router.route('/reviews').get(isAuthenticatedUser, getAllProductReviews);

router.route('/reviews').delete(isAuthenticatedUser, deleteProductReview);

module.exports = router;
