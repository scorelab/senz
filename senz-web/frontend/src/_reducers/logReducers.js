import {
  FETCH_STATUS_LOG,
  FETCH_LOG_PROJECT,
  CLEAR_ALL
} from "../_actions/types/index";

export const logReducers = (
  state = { statusLogArr: [], status: null, projectLogArr: [] },
  action
) => {
  switch (action.type) {
    case FETCH_STATUS_LOG:
      return {
        statusLogArr: action.payload.logArray,
        status: action.payload.statusCode,
        projectLogArr: state.projectLogArr
      };
    case FETCH_LOG_PROJECT:
      return {
        statusLogArr: [...state.statusLogArr],
        status: state.status,
        projectLogArr: [...action.payload]
      };
    case CLEAR_ALL:
      return {
        statusLogArr: [],
        status: null,
        projectLogArr: []
      };
    default:
      return state;
  }
};
