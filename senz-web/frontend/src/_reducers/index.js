import { combineReducers } from "redux";
import { toggleDrawerReducer } from "./layoutReducer";
import authReducer from "./authReducers";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  open: toggleDrawerReducer,
  form:formReducer,
  auth:authReducer
});
