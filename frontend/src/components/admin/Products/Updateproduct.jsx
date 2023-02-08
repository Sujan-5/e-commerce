import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import './createproduct.css';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { LeftSidebar } from '../LeftSidebar';
import StorageIcon from '@material-ui/icons/Storage';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  errorClear,
  updateProductDetails,
  getProductDetails,
} from '../../../reduxFeature/actions/productAction';
import { PRODUCT_UPDATE_RESET } from '../../../reduxFeature/reducers/Products/productConstants';
import { useAlert } from 'react-alert';

const Updateproduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [productname, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [Stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [pastimages, setPastImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ['Dairy', 'fruits', 'Snacks', 'Soft Drinks'];

  const productId = params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.productname);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setDescription(product.description);
      setPastImages(product.images);
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(errorClear());
    }

    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }

    if (isUpdated) {
      alert.success('Product Updated Successfully');
      navigate('/admin/products');
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const productUpdateSummitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set('productname', productname);
    formData.set('price', price);
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.set('description', description);
    formData.set('category', category);
    formData.set('Stock', Stock);

    dispatch(updateProductDetails(productId, formData));
  };

  const productImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setPastImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <Fragment>
      <div className="dashboard">
        <LeftSidebar />
        <div className="createProductContainer">
          <h1 className="headingProd">Create Product</h1>
          <form
            className="productForm"
            encType="multipart/form-data"
            onSubmit={productUpdateSummitHandler}
          >
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={productname}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
            <div>
              <AccountTreeIcon />
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
                ;
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="productformfile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={productImageChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {pastimages &&
                pastimages.map((image, index) => (
                  <img key={index} src={image.url} alt="Past Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
      ;
    </Fragment>
  );
};

export default Updateproduct;