import React, { Fragment } from 'react';
import { LeftSidebar } from '../LeftSidebar';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import './review.css';

export const ProductReviews = () => {
  const columns = [
    {
      field: 'id',
      headerName: 'Review ID',
      minWidth: 200,
      flex: 0.5,
    },
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
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: () => {
        return (
          <Fragment>
            <Button>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  return (
    <Fragment>
      <div className="dashboard">
        <LeftSidebar />
        <div className="productReviewContainer">
          <h1 className="headingReview">All Reviews</h1>
          <form className="productReviewsForm">
            <div>
              <SearchIcon />
              <input type="text" placeholder="Product Id" required />
            </div>

            <Button id="searchProductBtn" type="submit">
              Search
            </Button>
          </form>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
