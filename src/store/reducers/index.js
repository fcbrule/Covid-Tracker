import { getStatesData } from "../utils/api/statesData";
import statesReducer from "./statesReducer";

import { combineReducers } from "redux";
// const statesReducer = async () => {
//   let states = [];
//   await getStatesData().then((result) => {
//     console.log(result.data);
//     return result.data;
//   });
//   // return states;
// };

const selectedStateReducer = (selectedState = null, action) => {
  if (action.type === "STATE_SELECTED") {
    return action.payload;
  }

  return selectedState;
};

export default combineReducers({
  states: statesReducer,
  selectedState: selectedStateReducer,
});
