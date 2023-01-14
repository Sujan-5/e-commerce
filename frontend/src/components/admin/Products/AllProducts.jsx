import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { LeftSidebar } from '../LeftSidebar';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import './allproduct.css';

export const AllProducts = () => {
  const columns = [
    {
      field: 'id',
      headerName: 'Product ID',
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
        return (
          <Fragment>
            <Link>
              <EditIcon />
            </Link>

            <Button>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [{ id: 45652, name: 'Milk', stock: 444, price: 120 }];

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
