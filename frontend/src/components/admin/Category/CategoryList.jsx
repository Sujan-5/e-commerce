import React from 'react';
import { Link } from 'react-router-dom';
import { LeftSidebar } from '../LeftSidebar';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import {
  getAllCategory,
  errorClear,
  deleteCategory,
} from '../../../reduxFeature/actions/categoryAction';
import { useSelector, useDispatch } from 'react-redux';
// import './allproduct.css';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { useAlert } from 'react-alert';
// import { useNavigate } from 'react-router-dom';
// import { PRODUCT_DELETE_RESET } from '../../../reduxFeature/reducers/Products/productConstants';

export const CategoryList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  // const navigate = useNavigate();

  const {
    error,
    categories: { categoryList },
  } = useSelector((state) => state.categories);

  const deleteProductHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }

    dispatch(getAllCategory());
  }, [dispatch, alert, error]);

  const columns = [
    {
      field: 'id',
      headerName: 'S. N.',
      minWidth: 190,
      flex: 0.3,
    },
    {
      field: 'title',
      headerName: 'Category Name',
      minWidth: 350,
      flex: 0.5,
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, 'id'))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  let counter = 1;
  const rows = [];

  categoryList &&
    categoryList.forEach((cate) => {
      rows.push({
        id: counter++,
        title: cate.title,
        slug: cate.slug,
      });
    });

  // if (typeof categoryList === 'object') {
  //   for (const cate of Object.values(categoryList)) {
  //     rows.push({
  //       id: counter++,
  //       title: cate.title,
  //     });
  //   }
  // } else if (error) {
  //   console.error(error);
  // }

  return (
    <Fragment>
      <div className="dashboard">
        <LeftSidebar />
        <div className="productcontainer">
          <h1 className="heading">All Categories</h1>
          <Link to="/admin/category">
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
            className="categoryTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};