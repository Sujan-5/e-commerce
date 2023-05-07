import {
  //profile details update
  UPDATE_DETAILS_REQUEST,
  UPDATE_DETAILS_SUCCESS,
  UPDATE_DETAILS_FAIL,
  UPDATE_DETAILS_RESET,

  //password update
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_RESET,
  PASSWORD_UPDATE_FAIL,

  //forgot password
  PASSWORD_FORGOT_REQUEST,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_FORGOT_FAIL,

  //Reset Password
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,

  //update user role
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,

  //delete user
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,

  //error
  ERROR_CLEAR,
} from './userConstants';

export const accountReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DETAILS_REQUEST:
    case PASSWORD_UPDATE_REQUEST:
    case USER_UPDATE_REQUEST:
    case USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_DETAILS_SUCCESS:
    case PASSWORD_UPDATE_SUCCESS:
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case UPDATE_DETAILS_FAIL:
    case PASSWORD_UPDATE_FAIL:
    case USER_UPDATE_FAIL:
    case USER_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_DETAILS_RESET:
    case PASSWORD_UPDATE_RESET:
    case USER_UPDATE_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case USER_DELETE_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case ERROR_CLEAR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//password reset
export const passwordForgotReducer = (state = {}, action) => {
  switch (action.type) {
    case PASSWORD_FORGOT_REQUEST:
    case PASSWORD_RESET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PASSWORD_FORGOT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case PASSWORD_FORGOT_FAIL:
    case PASSWORD_RESET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ERROR_CLEAR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
