import React, { Fragment, useState } from 'react';
import './createproduct.css';
import { Button } from '@material-ui/core';
// import { Link } from 'react-router-dom';
import { LeftSidebar } from '../LeftSidebar';
import StorageIcon from '@material-ui/icons/Storage';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const CreateProduct = () => {
  const [productname, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ['Dairy', 'fruits', 'Snacks', 'Soft Drinks'];

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set('name', productname);
    myForm.set('price', price);
    images.forEach((image) => {
      myForm.append('images', image);
    });
  };

  const createProductImagesChange = (e) => {
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
  return (
    <Fragment>
      <div className="dashboard">
        <LeftSidebar />
        <div className="createProductContainer">
          <h1 className="headingProd">Create Product</h1>
          <form
            className="productForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
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
              <select>
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
              <input type="number" placeholder="Stock" required />
            </div>

            <div id="productformfile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Avatar Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              //   disabled={loading ? true : false}
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
