import { getStatesData } from "../../utils/api/statesData";

export const selectState = (state) => {
  return {
    type: "STATE_SELECTED",
    payload: state,
  };
};

// export const fetchStates = () => async (dispatch) => {
//     const response = await getStatesData();

//     dispatch({ type: "STATES_FETCHED", payload: response });
//   };

export const fetchStates = () => {
  //BAD APPROACH!!!!!!! Because async await takes time returns promise
  // const response = await getStatesData();
  // return {
  //   type: "STATE_FETCHED",
  //   payload: response.data,
  // };

  //use redux thunk return function
  // return async function (dispatch, getState) {
  //   const response = await getStatesData();

  //   dispatch({ type: "STATES_FETCHED", payload: response });
  // };

  return async (dispatch) => {
    const response = await getStatesData();

    dispatch({ type: "STATES_FETCHED", payload: response });
  };
};
