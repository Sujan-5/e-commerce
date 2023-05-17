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

  //user list
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,

  //admin -- user details
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,

  //error
  ERROR_CLEAR,
} from './userConstants';

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case USER_LOAD_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case USER_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
        error: null,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case USER_LOAD_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_FAIL:
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

export const usersListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case USER_LIST_FAIL:
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

//admin
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
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
