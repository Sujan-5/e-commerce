import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { LeftSidebar } from '../LeftSidebar';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import { useDispatch, useSelector } from 'react-redux';
import './category.css';
import {
  updateCategoryDetails,
  errorClear,
  getadminCategoryDetails,
} from '../../../reduxFeature/actions/categoryAction';
import { CATEGORY_UPDATE_RESET } from '../../../reduxFeature/reducers/category/categoryConstants';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const params = useParams();

  const { error, loading, isUpdated, category } = useSelector(
    (state) => state.categoryDetails
  );

  const [title, setTitle] = useState('');
  const [image, setImage] = useState([]);
  const [pastImage, setpastImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const categoryId = params.id;

  useEffect(() => {
    if (category && category._id !== categoryId) {
      dispatch(getadminCategoryDetails(categoryId));
    } else {
      setTitle(category.title);
      setpastImage(category.image);
    }

    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }

    if (isUpdated) {
      alert.success('Category Updated Successfully');
      navigate('/admin/categories');
      dispatch({ type: CATEGORY_UPDATE_RESET });
    }
  }, [dispatch, alert, navigate, error, isUpdated, categoryId, categories]);

  const productSummitHandler = () => {
    const form = new FormData();
    form.set('title', title);
    image.forEach((img) => {
      form.append('images', img);
    });

    dispatch(updateCategoryDetails(form));
  };

  const productImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImage([]);
    setImagePreview([]);
    setpastImage([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImage((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <div className="dashboard">
        <LeftSidebar />
        <div className="categoryContainer">
          <h1 className="headingProd">Add Category</h1>
          <form className="categoryForm" onSubmit={productSummitHandler}>
            <div>
              <SpellcheckIcon />
              <input
                value={title}
                placeholder={`Category Name`}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                required
              />
            </div>

            <div id="categoryUpdateformfile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={productImageChange}
                multiple
              />
            </div>

            <div id="updateCategoryFormImage">
              {pastImage &&
                pastImage.map((image, index) => (
                  <img
                    key={index}
                    src={image?.url}
                    alt="Past Product Preview"
                  />
                ))}
            </div>

            <div id="updateCategoryFormImage">
              {imagePreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
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
