import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { LeftSidebar } from '../LeftSidebar';
import { USER_UPDATE_RESET } from '../../../reduxFeature/reducers/Users/userConstants';
import { useNavigate, useParams } from 'react-router-dom';

import Loader from '../../mainPage/FrontFeatures/Loading/Loader';
import {
  errorClear,
  userUpdate,
} from '../../../reduxFeature/actions/userAction';
import { getUserDetails } from '../../../reduxFeature/actions/userAction';

const UpdateUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [role, setRole] = useState('');

  const userId = params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(errorClear());
    }

    if (isUpdated) {
      alert.success('User Updated Successfully');
      navigate('/admin/users');
      dispatch({ type: USER_UPDATE_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('role', role);

    dispatch(userUpdate(userId, myForm));
  };

  return (
    <Fragment>
      <div className="dashboard">
        <LeftSidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === '' ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
