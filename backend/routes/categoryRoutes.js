const router = require('express').Router();
const {
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
} = require('../controllers/categoryController');
// const { isAuthenticatedUser, authorizeRoles } = require('../Middleware/authe');

router.route('/category/new').post(getCategory);
router.route('/category/:id').put(updateCategory);

router.route('/category/:id').delete(deleteCategory);

router.route('/category/all').get(getAllCategory);

module.exports = router;
