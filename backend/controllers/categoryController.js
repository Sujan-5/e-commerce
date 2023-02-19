const Category = require('../models/category');
const catchAsyncError = require('../Middleware/catchAsyncErrors');
const slugify = require('slugify');

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;

  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      title: cate.title,
      slug: cate.slug,
      parentId: cate.parentId,
      // children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}

exports.getCategory = catchAsyncError(async (req, res, next) => {
  try {
    const categoryObj = {
      title: req.body.title,
      slug: slugify(req.body.title),
    };
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    const savedCategory = await cat.save();
    return res.status(201).json({ category: savedCategory });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

exports.updateCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateCat = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCat);
  } catch (error) {
    throw new Error(error);
  }
});

exports.deleteCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteCat = await Category.findByIdAndDelete(id);

    res.json(deleteCat);
  } catch (error) {
    throw new Error(error);
  }
});

exports.getAllCategory = catchAsyncError(async (req, res, next) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });

    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
});
