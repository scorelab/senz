import {
  FETCH_PROJECTS,
  ADD_PROJECT,
  SET_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT_INFO,
  ADD_DEVICE_PROJECT,
  CLEAR_ALL
} from "../_actions/types/index";
export const projectReducers = (
  state = { AllProject: [], SelectedProject: {} },

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
    case CLEAR_ALL:
      return { AllProject: [], SelectedProject: {} };
    case UPDATE_PROJECT_INFO:
      return {
        AllProject: [
          ...state.AllProject.map(project => {
            if (project._id === action.payload._id) {
              return action.payload;
            }
            return project;
          })
        ],
        SelectedProject: action.payload
      };
    case ADD_DEVICE_PROJECT:
      return {
        AllProject: [
          ...state.AllProject.map(project => {
            if (project._id === state.SelectedProject._id) {
              project.devices.push(action.payload._id);
            }
            return project;
          })
        ],
        SelectedProject: state.SelectedProject.devices.push(action.payload._id)
      };
    default:
      return state;
  }
};
