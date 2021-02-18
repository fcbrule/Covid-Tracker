import { getCachedUpdatesLog } from "../../utils/storage/getDataFromCache";

import {
  FETCH_UPDATES_FAILURE,
  FETCH_UPDATES_REQUEST,
  FETCH_UPDATES_SUCCESS,
} from "./updatesActionTypes";

// loading
export const fetchUpdatesRequest = () => {
  return {
    type: FETCH_UPDATES_REQUEST,
  };
};

// success
export const fetchUpdatesSuccess = (updates) => {
  return {
    type: FETCH_UPDATES_SUCCESS,
    payload: updates,
  };
};

// error
export const fetchUpdatesFailure = (error) => {
  return {
    type: FETCH_UPDATES_FAILURE,
    payload: error,
  };
};

export const fetchUpdates = () => {
  return async (dispatch) => {
    dispatch(fetchUpdatesRequest());

    try {
      const updatesData = await getCachedUpdatesLog();

      dispatch(fetchUpdatesSuccess(updatesData));
    } catch (error) {
      dispatch(fetchUpdatesFailure(error));
    }
  };
};
