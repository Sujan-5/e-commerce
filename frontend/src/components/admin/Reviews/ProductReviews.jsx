import React, { Fragment, useState, useEffect } from 'react';
import { LeftSidebar } from '../LeftSidebar';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import './review.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { DELETE_PRODUCT_REVIEW_RESET } from '../../../reduxFeature/reducers/Review/reviewConstants';
import {
  deleteReviews,
  errorClear,
  getAllAdminReviews,
} from '../../../reduxFeature/actions/reviewAction';

export const ProductReviews = () => {
  const [productId, setProductId] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );

  const { error, reviews, loading } = useSelector((state) => state.allreviews);

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllAdminReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllAdminReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(errorClear());
    }

    if (isDeleted) {
      alert.success('Review Deleted Successfully');
      navigate('/admin/reviews');
      dispatch({ type: DELETE_PRODUCT_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, productId]);

  const columns = [
    {
      field: 'user',
      headerName: 'User',
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: 'comment',
      headerName: 'Comment',
      minWidth: 350,
      flex: 1,
    },

    {
      field: 'rating',
      headerName: 'Rating',
      type: 'number',
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, 'rating') >= 3
          ? 'greenColor'
          : 'redColor';
      },
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
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, 'id'))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <div className="dashboard">
        <LeftSidebar />
        <div className="productReviewContainer">
          <h1 className="headingReview">All Reviews</h1>
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <div>
              <SearchIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="searchProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === '' ? true : false
              }
            >
              Search
            </Button>
          </form>
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1>No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
