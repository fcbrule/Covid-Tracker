import { combineReducers } from "redux";

import statesReducer from "./states/statesReducer";
import updatesReducer from "./updates/updatesReducer";

export default combineReducers({
  statesReducer,
  updatesReducer,
});
