import { getCachedStatesData } from "../../utils/storage/getDataFromCache";

import {
  FETCH_STATES_FAILURE,
  FETCH_STATES_REQUEST,
  FETCH_STATES_SUCCESS,
} from "./statesActionTypes";

// loading
export const fetchStatesRequest = () => {
  return {
    type: FETCH_STATES_REQUEST,
  };
};

// success
export const fetchStatesSuccess = (states) => {
  return {
    type: FETCH_STATES_SUCCESS,
    payload: states,
  };
};

// error
export const fetchStatesFailure = (error) => {
  return {
    type: FETCH_STATES_FAILURE,
    payload: error,
  };
};

export const fetchStates = () => {
  return async (dispatch) => {
    dispatch(fetchStatesRequest());

    try {
      const statesData = await getCachedStatesData();

      dispatch(fetchStatesSuccess(statesData));
    } catch (error) {
      dispatch(fetchStatesFailure(error));
    }
  };
};
