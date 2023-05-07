import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LeftSidebar } from '../LeftSidebar';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import './users.css';
import {
  userDelete,
  usersList,
  errorClear,
} from '../../../reduxFeature/actions/userAction';
import { USER_DELETE_RESET } from '../../../reduxFeature/reducers/Users/userConstants';

export const AllUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.userList);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.user);

  const deleteUserHandler = (id) => {
    dispatch(userDelete(id));
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
      alert.success(message);
      navigate('/admin/users');
      dispatch({ type: USER_DELETE_RESET });
    }

    dispatch(usersList());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  const columns = [
    {
      field: 'id',
      headerName: 'User Id',
      minWidth: 250,
      flex: 0.3,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 150,
      flex: 0.2,
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
            <Link to={`/admin/user/${params.getValue(params.id, 'id')}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, 'id'))
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.firstName,
      });
    });

  return (
    <Fragment>
      <div className="dashboard">
        <LeftSidebar />
        <div className="productcontainer">
          <h1 className="heading">All Users</h1>

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

export default AllUser;
