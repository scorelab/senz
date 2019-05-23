const toggle = state => {
  var newState = { ...state };
  newState.open = !newState.open;
  return newState;
};

export const toggleDrawerReducer = (state = {}, action) => {
  switch (action.type) {
    case "TOGGLE_DRAWER":
      return toggle(state);
    default:
      return state;
  }
};
