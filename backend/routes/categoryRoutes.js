const router = require('express').Router();
const {
  getCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
} = require('../controllers/categoryController');
const { isAuthenticatedUser, authorizeRoles } = require('../Middleware/authe');

router
  .route('/category/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), getCategory);
router
  .route('/category/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory);

router
  .route('/category/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategory);

router
  .route('/category/all')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAllCategory);

router.route('/category/one').get(getOneCategory);

module.exports = router;
