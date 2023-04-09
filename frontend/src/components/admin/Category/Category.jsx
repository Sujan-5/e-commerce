import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { LeftSidebar } from '../LeftSidebar';
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

  const { loading, error, success } = useSelector(
    (state) => state.createCategory
  );

  const [title, setName] = useState('');
  const [image, setImage] = useState('/profile.png');
  const [imagePreview, setImagePreview] = useState('/profile.png');

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
  }, [dispatch, alert, navigate, error, success]);

  const productSummitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set('title', title);
    formData.append('image', image);

    dispatch(addCategory(formData));
  };

  const categoryHandleChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview([reader.result]);
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <Fragment>
      <div className="dashboard">
        <LeftSidebar />
        <div className="categoryContainer">
          <h1 className="headingProd">Add Category</h1>
          <form
            className="categoryForm"
            encType="multipart/form-data"
            onSubmit={productSummitHandler}
          >
            <div>
              <SpellcheckIcon />
              <input
                placeholder="Category Name"
                type="text"
                value={title}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div id="categoryyy">
              {imagePreview && (
                <div className="image-preview">
                  <div className="image-preview-container">
                    <img src={imagePreview} alt="Category Preview" />
                  </div>
                </div>
              )}
              <input
                type="file"
                name="avatar"
                accept="image/*"
                id="categoryImage"
                onChange={categoryHandleChange}
              />
              <label htmlFor="categoryImage" className="custom-file-upload">
                Choose File
              </label>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
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
