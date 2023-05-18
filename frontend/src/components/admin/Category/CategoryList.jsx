import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LeftSidebar } from '../LeftSidebar';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
// import EditIcon from '@material-ui/icons/Edit';
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
import { CATEGORY_DELETE_RESET } from '../../../reduxFeature/reducers/category/categoryConstants';

export const CategoryList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const navigate = useNavigate();

  const { error, categories } = useSelector((state) => state.categories);

  const { error: deleteError, isDeleted } =
    useSelector((state) => state.category) || {};

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
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
      alert.success('Category Deleted Successfully');
      navigate('/admin/categories');
      dispatch({ type: CATEGORY_DELETE_RESET });
    }
    dispatch(getAllCategory());
  }, [dispatch, alert, error, isDeleted, deleteError, navigate]);

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
        const categoryId = params.getValue(params.id, 'categoryId');
        return (
          <Fragment>
            {/* <Link to={`/admin/category/${categoryId}`}>
              <EditIcon />
            </Link> */}

            <Button onClick={() => deleteCategoryHandler(categoryId)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  let counter = 1;
  const rows = [];

  categories &&
    categories
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .forEach((cate) => {
        rows.push({
          id: counter++,
          title: cate.title,
          slug: cate.slug,
          categoryId: cate._id,
        });
      });

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
