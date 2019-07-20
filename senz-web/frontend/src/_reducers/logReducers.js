import {
  FETCH_ALL_LOG,
  FETCH_LOG_PROJECT,
  CLEAR_ALL
} from "../_actions/types/index";

export const logReducers = (
  state = { statusLogArr: [], projectLogArr: [] },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_LOG:
      return {
        statusLogArr: [...action.payload],
        projectLogArr: [...state.projectLogArr]
      };
    case FETCH_LOG_PROJECT:
      return {
        statusLogArr: [...state.statusLogArr],
        projectLogArr: [...action.payload]
      };
    case CLEAR_ALL:
      return {
        statusLogArr: [],
        projectLogArr: []
      };
    default:
      return state;
  }
};
