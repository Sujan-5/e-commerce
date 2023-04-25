import {
  WRITE_REVIEW_REQUEST,
  WRITE_REVIEW_SUCCESS,
  WRITE_REVIEW_FAIL,

  //error
  ERRORS_CLEAR,
} from '../reducers/Review/reviewConstants';
import axios from 'axios';

//write Review
export const writeReview = (dataOfReview) => async (dispatch) => {
  try {
    dispatch({ type: WRITE_REVIEW_REQUEST });

    const env = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.put(`/api/v1/review`, dataOfReview, env);

    dispatch({ type: WRITE_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: WRITE_REVIEW_FAIL, payload: error.response.data.message });
  }
};

export const errorClear = () => async (dispatch) => {
  dispatch({
    type: ERRORS_CLEAR,
  });
};
