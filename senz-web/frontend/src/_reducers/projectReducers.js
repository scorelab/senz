import {
  FETCH_PROJECTS,
  ADD_PROJECT,
  ADD_PROJECT_ERROR,
  SET_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT_INFO,
  ADD_DEVICE_PROJECT,
  HANDLE_SWITCH,
  REMOVE_DEVICE_PROJECT,
  SWITCH_DEVICE,
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
    case ADD_PROJECT_ERROR:
      return { ...state, error: action.payload };
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
      var modDevices = [];
      if (state.SelectedProject.devices.includes(action.payload._id))
        modDevices = state.SelectedProject.devices;
      else modDevices = [...state.SelectedProject.devices, action.payload];
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
          devices: modDevices
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
    case SWITCH_DEVICE:
      var modDeviceList = [];
      if (state.SelectedProject.devices) {
        modDeviceList = state.SelectedProject.devices.map(device => {
          for (var i = 0; i < action.payload.length; i++) {
            if (device._id === action.payload[i]._id) {
              device.status = action.payload[i].status;
            }
          }
          return device;
        });
      }
      return {
        AllProject: [
          ...state.AllProject.map(project => {
            if (project._id === state.SelectedProject._id) {
              project.devices = modDeviceList;
            }
            return project;
          })
        ],
        SelectedProject: { ...state.SelectedProject, devices: modDeviceList }
      };
    default:
      return state;
  }
};
