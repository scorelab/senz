import {
  FETCH_PROJECTS,
  ADD_PROJECT,
  SET_PROJECT,
  DELETE_PROJECT
} from "../_actions/types/index";
export const fetchProjectReducer = (
  state = { AllProject: [], SelectedProject: null },
  action
) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        AllProject: action.payload,
        SelectedProject: state.SelectedProject
      };
    case ADD_PROJECT:
      return {
        AllProject: [...state.AllProject, action.payload],
        SelectedProject: state.SelectedProject
      };
    case SET_PROJECT:
      return { AllProject: state.AllProject, SelectedProject: action.payload };
    case DELETE_PROJECT:
      return {
        AllProject: [
          ...state.AllProject.filter(project => {
            return project._id !== action.payload;
          })
        ],
        SelectedProject: state.SelectedProject
      };
    default:
      return state;
  }
};
