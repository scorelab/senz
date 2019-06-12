import {
  FETCH_PROJECTS,
  ADD_PROJECT,
  SET_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT_INFO,
  ADD_DEVICE_PROJECT,
  HANDLE_SWITCH,
  REMOVE_DEVICE_PROJECT,
  CLEAR_ALL
} from "../_actions/types/index";
export const projectReducers = (
  state = { AllProject: [], SelectedProject: {} },
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
            return project._id !== action.payload._id;
          })
        ],
        SelectedProject: {}
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
              project.devices.push(action.payload);
            }
            return project;
          })
        ],
        SelectedProject: {
          ...state.SelectedProject,
          devices: [...state.SelectedProject.devices, action.payload]
        }
      };
    case REMOVE_DEVICE_PROJECT:
      return {
        AllProject: [
          ...state.AllProject.map(project => {
            if (project._id === state.SelectedProject._id) {
              return action.payload;
            }
            return project;
          })
        ],
        SelectedProject: action.payload
      };
    case HANDLE_SWITCH:
      return {
        AllProject: [
          ...state.AllProject.map(project => {
            if (project._id === state.SelectedProject._id) {
              return action.payload;
            }
            return project;
          })
        ],
        SelectedProject: {
          ...action.payload
        }
      };
    default:
      return state;
  }
};
