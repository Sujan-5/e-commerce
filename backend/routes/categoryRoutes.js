const router = require('express').Router();

const {
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
} = require('../controllers/categoryController');
const { isAuthenticatedUser, authorizeRoles } = require('../Middleware/authe');

router
  .route('/category')
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

module.exports = router;
