import { NAV_HEADING, CLEAR_ALL } from "../_actions/types/index";
export default (state = { heading: "Dashboard" }, action) => {
  switch (action.type) {
    case NAV_HEADING:
      return action.payload;
    case CLEAR_ALL:
      return { heading: "" };
    default:
      return state;
  }
};
