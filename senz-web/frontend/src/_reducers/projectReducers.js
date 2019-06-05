import {
  FETCH_PROJECTS,
  ADD_PROJECT,
  SET_PROJECT
} from "../_actions/types/index";
export const fetchProjectReducer = (
  state = { AllProject: [], SelectedProject: null },
  action
) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return { AllProject: action.payload };
    case ADD_PROJECT:
      return { AllProject: [...state.AllProject, action.payload] };
    case SET_PROJECT:
      return { AllProject: state.AllProject, SelectedProject: action.payload };
    default:
      return state;
  }
};
