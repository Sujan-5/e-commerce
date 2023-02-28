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

  //error
  ERROR_CLEAR,
} from './userConstants';

export const accountReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DETAILS_REQUEST:
    case PASSWORD_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_DETAILS_SUCCESS:
    case PASSWORD_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_DETAILS_FAIL:
    case PASSWORD_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_DETAILS_RESET:
    case PASSWORD_UPDATE_RESET:
      return {
        ...state,
        isUpdated: false,
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
