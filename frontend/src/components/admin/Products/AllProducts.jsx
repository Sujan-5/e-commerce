import React from 'react';
import { Link } from 'react-router-dom';
import { LeftSidebar } from '../LeftSidebar';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import {
  errorClear,
  getAdminProduct,
  deleteProduct,
} from '../../../reduxFeature/actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import './allproduct.css';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_DELETE_RESET } from '../../../reduxFeature/reducers/Products/productConstants';

export const AllProducts = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(errorClear());
    }

    if (isDeleted) {
      alert.success('Product Deleted Successfully');
      navigate('/admin/products');
      dispatch({ type: PRODUCT_DELETE_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    {
      field: 'id',
      headerName: 'S. N.',
      minWidth: 190,
      flex: 0.3,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 350,
      flex: 0.5,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 150,
      flex: 0.2,
    },

    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      minWidth: 200,
      flex: 0.3,
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        const productId = params.getValue(params.id, 'productId');
        return (
          <Fragment>
            <Link to={`/admin/product/${productId}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteProductHandler(productId)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  let counter = 0;
  const rows = [];

  products &&
    products.forEach((prod) => {
      rows.push({
        id: counter++,
        stock: prod.Stock,
        price: prod.price,
        name: prod.name,
        productId: prod._id,
      });
    });

  return (
    <Fragment>
      <div className="dashboard">
        <LeftSidebar />
        <div className="productcontainer">
          <h1 className="heading">All Products</h1>
          <Link to="/admin/product">
            <button>
              <Add />
              Create
            </button>
          </Link>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};
