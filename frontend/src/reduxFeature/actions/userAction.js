import axios from 'axios';

import {
  //login
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  //register
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  //load user
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,

  //logout
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,

  //profile details update
  UPDATE_DETAILS_REQUEST,
  UPDATE_DETAILS_SUCCESS,
  UPDATE_DETAILS_FAIL,

  //password update
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAIL,

  //forgot password
  PASSWORD_FORGOT_REQUEST,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_FORGOT_FAIL,

  //Reset Password
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,

  //error
  ERROR_CLEAR,
} from '../reducers/Users/userConstants';

//login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.post(
      `/api/log/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//register
export const register = (dataOfUser) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const { data } = await axios.post(`/api/log/register`, dataOfUser, {
      config,
    });

    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};

//load user
export const userLoad = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOAD_REQUEST });

    const { data } = await axios.get(`/api/log/profile`);
    dispatch({ type: USER_LOAD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_LOAD_FAIL, payload: error.response.data.message });
  }
};

//logout user
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/log/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

//update acount details
export const editProfileDetails = (dataaOfUser) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DETAILS_REQUEST });

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const { data } = await axios.put(
      `/api/log/profile/update`,
      dataaOfUser,
      config
    );

    dispatch({ type: UPDATE_DETAILS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update password
export const editPassword = (dataOfUser) => async (dispatch) => {
  try {
    dispatch({ type: PASSWORD_UPDATE_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.put(
      `/api/log/password/update-password`,
      dataOfUser,
      {
        config,
      }
    );

    dispatch({ type: PASSWORD_UPDATE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: PASSWORD_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//forgot password
export const passwordForgot = (email) => async (dispatch) => {
  try {
    dispatch({ type: PASSWORD_FORGOT_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.post(
      `/api/log/password/forgot-password`,
      email,
      config
    );

    dispatch({ type: PASSWORD_FORGOT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: PASSWORD_FORGOT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//forgot password
export const passwordReset = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: PASSWORD_RESET_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.put(
      `/api/log/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: PASSWORD_RESET_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clearing errors
export const errorClear = () => async (dispatch) => {
  dispatch({ type: ERROR_CLEAR });
};
