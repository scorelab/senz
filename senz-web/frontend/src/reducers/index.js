import { combineReducers } from "redux";
import { toggleDrawerReducer } from "./layoutReducer";

export default combineReducers({
  open: toggleDrawerReducer
});
