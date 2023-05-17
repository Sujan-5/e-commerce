import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
// import { DataGrid } from '@mui/x-data-grid';
import './userOrder.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import LaunchIcon from '@material-ui/icons/Launch';
import {
  errorClear,
  myOrders,
} from '../../../reduxFeature/actions/OrderAction';
import Loader from '../FrontFeatures/Loading/Loader';

const UserOrder = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, myorders } = useSelector((state) => state.myOrders);

  const columns = [
    {
      field: 'name',
      headerName: 'Product Name',
      type: 'text',
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.2,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'greenColor'
          : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 150,
      flex: 0.2,
    },

    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 270,
      flex: 0.25,
    },

    {
      field: 'actions',
      flex: 0.25,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/myorder/details/${params.getValue(params.id, 'id')}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];
  myorders &&
    myorders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .forEach((item, index) => {
        const itemNames = item.orderItems.map((orderItem) => orderItem.name);
        const nameString = itemNames.join(', ');
        rows.push({
          itemsQty: item.orderItems.length,
          id: item._id,
          name: nameString,
          status: item.orderStatus,
          amount: item.totalPrice,
        });
      });

  console.log();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="userOrderContainer">
          <h1 className="orderHead">My Orders</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="userOrdersTable"
            autoHeight
          />
        </div>
      )}
    </Fragment>
  );
};

export default UserOrder;
