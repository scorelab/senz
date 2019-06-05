export default (state = { heading: "Dashboard" }, action) => {
  switch (action.type) {
    case "NAV_HEADING":
      return action.payload;
    default:
      return state;
  }
};
