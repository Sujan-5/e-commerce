import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import './createproduct.css';
import { Button } from '@material-ui/core';
// import { Link } from 'react-router-dom';
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
  createProduct,
} from '../../../reduxFeature/actions/productAction';
import { PRODUCT_NEW_ADMIN_RESET } from '../../../reduxFeature/reducers/Products/productConstants';
import { useAlert } from 'react-alert';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.createProduct
  );

  const [productname, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [Stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ['Dairy', 'fruits', 'Snacks', 'Soft Drinks'];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }

    if (success) {
      alert.success('Product Created Successfully');
      navigate('/admin/products');
      dispatch({ type: PRODUCT_NEW_ADMIN_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const productSummitHandler = (e) => {
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

    dispatch(createProduct(formData));
  };

  const productImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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

  // function handleRemoveImg(imgObj) {
  //   setImgToRemove(imgObj.public_id);
  //   axios
  //     .delete(`/images/${imgObj.public_id}/`)
  //     .then((res) => {
  //       setImgToRemove(null);
  //       setImages((prev) =>
  //         prev.filter((img) => img.public_id !== imgObj.public_id)
  //       );
  //     })
  //     .catch((e) => console.log(e));
  // }
  return (
    <Fragment>
      <div className="dashboard">
        <LeftSidebar />
        <div className="createProductContainer">
          <h1 className="headingProd">Create Product</h1>
          <form
            className="productForm"
            encType="multipart/form-data"
            onSubmit={productSummitHandler}
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
              <select onChange={(e) => setCategory(e.target.value)}>
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
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Avatar Preview" />
              ))}
              {/* {imgToRemove != image.public_id && (
                <i
                  className="fa fa-times-circle"
                  onClick={() => handleRemoveImg(image)}
                ></i>
              )} */}
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

export default CreateProduct;

/* <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required
                    value={product.product_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={product.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={product.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={product.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                    value={product.content} rows="7" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    ) */
