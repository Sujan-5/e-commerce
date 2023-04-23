import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LeftSidebar } from '../LeftSidebar';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector, useDispatch } from 'react-redux';
import {
  allOrdersAdmin,
  // updateOrdersAdmin,
  deleteOrdersAdmin,
  errorClear,
} from '../../../reduxFeature/actions/OrderAction';
import './orders.css';
import { useAlert } from 'react-alert';
import { ORDER_DELETE_RESET } from '../../../reduxFeature/reducers/Orders/orderConstants';

export const OrdersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.orders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrdersAdmin(id));
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
      alert.success('Order Deleted Successfully');
      navigate('/admin/orders');
      dispatch({ type: ORDER_DELETE_RESET });
    }

    dispatch(allOrdersAdmin());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

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
      flex: 0.2,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'green'
          : 'red ';
      },
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
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              to={`/admin/update/order/${params.getValue(params.id, 'id')}`}
            >
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, 'id'))
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

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        items_quantity: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <div className="dashboard">
        <LeftSidebar />
        <div className="ordercontainer">
          <h1 className="heading">All Orders</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="orderTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrdersList;
