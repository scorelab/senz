import { combineReducers } from "redux";
import toggleHeadingReducer from "./headingReducer";
import authReducer from "./authReducers";
import { deviceReducers } from "./deviceReducers";
import { projectReducers } from "./projectReducers";
import { logReducers } from "./logReducers";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  heading: toggleHeadingReducer,
  form: formReducer,
  auth: authReducer,
  project: projectReducers,
  device: deviceReducers,
  log: logReducers
});
