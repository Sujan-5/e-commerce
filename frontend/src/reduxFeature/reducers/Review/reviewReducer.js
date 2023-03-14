import {
  WRITE_REVIEW_REQUEST,
  WRITE_REVIEW_SUCCESS,
  WRITE_REVIEW_FAIL,
  WRITE_REVIEW_RESET,

  //for error
  ERRORS_CLEAR,
} from './reviewConstants';

export const writeReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case WRITE_REVIEW_REQUEST: //home
      return {
        ...state,
        loading: true,
      };
    case WRITE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case WRITE_REVIEW_FAIL: //home
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case WRITE_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };

    case ERRORS_CLEAR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
