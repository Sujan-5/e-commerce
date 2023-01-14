import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { LeftSidebar } from '../LeftSidebar';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './orders.css';

export const Orders = () => {
  const columns = [
    {
      field: 'id',
      headerName: 'Order Id',
      minWidth: 250,
      flex: 0.3,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: 'items_quantity',
      headerName: 'Items Quantity',
      type: 'number',
      minWidth: 150,
      flex: 0.2,
    },

    {
      field: 'amount',
      headerName: 'Amount',
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
      renderCell: () => {
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

  const rows = [
    { id: 45652, status: 'shipping', items_quantity: 1, amount: 120 },
  ];

  return (
    <Fragment>
      <div className="dashboard">
        <LeftSidebar />
        <div className="productcontainer">
          <h1 className="heading">All Orders</h1>

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

export default Orders;
