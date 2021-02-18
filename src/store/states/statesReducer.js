import {
  FETCH_STATES_FAILURE,
  FETCH_STATES_REQUEST,
  FETCH_STATES_SUCCESS,
} from "./statesActionTypes";

const initialState = {
  isLoading: false,
  states: {},
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATES_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_STATES_SUCCESS:
      return { ...state, isLoading: false, states: action.payload, error: {} };
    case FETCH_STATES_FAILURE:
      return {
        ...state,
        isLoading: false,
        states: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
