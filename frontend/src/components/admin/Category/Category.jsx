import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { LeftSidebar } from '../LeftSidebar';
import DescriptionIcon from '@material-ui/icons/Description';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import './category.css';
// import {
//  errorClear,
//   createProduct,
// } from '../../../reduxFeature/actions/productAction';
// import { PRODUCT_NEW_ADMIN_RESET } from '../../../reduxFeature/reducers/Products/productConstants';
// import { useAlert } from 'react-alert';

const Category = () => {
  // const dispatch = useDispatch();
  // const alert = useAlert();
  // const navigate = useNavigate();

  // const { loading, error, success } = useSelector(
  //   (state) => state.createCategory
  // );

  const [category, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(errorClear());
    // }
    //   if (success) {
    //     alert.success('Product Created Successfully');
    //     navigate('/admin/category');
    //     // dispatch({ type: PRODUCT_NEW_ADMIN_RESET });
    //   }
    // }, [dispatch, alert, error, navigate, success]);
  });

  const productSummitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set('name', category);
    formData.set('description', description);

    // dispatch(createProduct(formData));
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
                type="text"
                placeholder="Category Name"
                required
                value={category}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                type="number"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product Description"
                cols="30"
                rows="1"
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              // disabled={loading ? true : false}
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
