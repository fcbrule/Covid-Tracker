import {
  FETCH_UPDATES_FAILURE,
  FETCH_UPDATES_REQUEST,
  FETCH_UPDATES_SUCCESS,
} from "./updatesActionTypes";

const initialState = {
  isLoading: false,
  updates: [],
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UPDATES_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_UPDATES_SUCCESS:
      return { ...state, isLoading: false, updates: action.payload };
    case FETCH_UPDATES_FAILURE:
      return {
        ...state,
        isLoading: false,
        updates: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
