import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { LeftSidebar } from '../LeftSidebar';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import { useDispatch, useSelector } from 'react-redux';
import './category.css';
import {
  addCategory,
  errorClear,
} from '../../../reduxFeature/actions/categoryAction';
import { NEW_CATEGORY_RESET } from '../../../reduxFeature/reducers/category/categoryConstants';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, success } = useSelector((state) => state.createCategory);

  const [categoryName, setName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }

    if (success) {
      alert.success('Category Created Successfully');
      navigate('/admin/products');
      dispatch({ type: NEW_CATEGORY_RESET });
    }
  }, [dispatch]);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, title: category.title });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const productSummitHandler = () => {
    const form = new FormData();

    form.append('title', categoryName);
    form.append('parentId', parentCategoryId);
    dispatch(addCategory(form));
  };

  return (
    <Fragment>
      <div className="dashboard">
        <LeftSidebar />
        <div className="categoryContainer">
          <h1 className="headingProd">Add Category</h1>
          <form className="categoryForm" onSubmit={productSummitHandler}>
            {/* <form className="categoryForm"> */}
            <div>
              <SpellcheckIcon />
              <input
                value={categoryName}
                placeholder={`Category Name`}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
              />
            </div>
            {/* setParentCategoryId */}
            {/* <div>
              <AccountTreeIcon />
              <select
                value={parentCategoryId}
                onChange={(e) => setParentCategoryId(e.target.value)}
              >
                <option>Choose Category</option>
                {createCategoryList(category.categories).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div> */}

            <Button id="createProductBtn" type="submit">
              Add
            </Button>
          </form>
        </div>
      </div>
      ;
    </Fragment>
  );
};

export default Category;
