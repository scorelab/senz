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
  SWITCH_DEVICES_REQUEST,
  CLEAR_ALL,
  FETCH_PROJECT_REQUEST,
  SWITCH_PROJECT_REQUEST,
  REMOVE_DEVICE_FROM_PROJECT_REQUEST,
  ADD_PROJECT_REQUEST,
  DELETE_PROJECT_REQUEST,
  UPDATE_PROJECT_REQUEST,
  SET_PROJECT_REQUEST,
  ADD_DEVICE_TO_PROJECT_REQUEST
} from "../_actions/types/index";
export const projectReducers = (
  state = { AllProject: [], SelectedProject: {}, loading: false, switchloading:false },
  action
) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        AllProject: action.payload,
        SelectedProject: state.SelectedProject,
        loading: false
      };
    case FETCH_PROJECT_REQUEST:
      return { ...state, loading: true }
    case ADD_PROJECT:
      return {
        AllProject: [...state.AllProject, action.payload],
        SelectedProject: state.SelectedProject,
        loading: false
      };
    case ADD_PROJECT_ERROR:
      return { ...state, error: action.payload };
    case ADD_PROJECT_REQUEST:
      return { ...state, loading: true }
    case SET_PROJECT:
      return { AllProject: state.AllProject, SelectedProject: action.payload, loading: false };
    case SET_PROJECT_REQUEST:
      return { ...state, loading: true }
    case DELETE_PROJECT:
      return {
        AllProject: [
          ...state.AllProject.filter(project => {
            return project._id !== action.payload._id;
          })
        ],
        SelectedProject: {},
        loading: false
      };
    case DELETE_PROJECT_REQUEST:
      return { ...state, loading: true }
    case CLEAR_ALL:
      return { AllProject: [], SelectedProject: {}, loading: false };
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
        SelectedProject: action.payload,
        loading: false
      };
    case UPDATE_PROJECT_REQUEST:
      return { ...state, loading: true }
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
        },
        loading: false
      };
    case ADD_DEVICE_TO_PROJECT_REQUEST:
      return { ...state, loading: true }
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
        SelectedProject: action.payload,
        loading: false
      };
    case REMOVE_DEVICE_FROM_PROJECT_REQUEST:
      return { ...state, loading: true }
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
        },
        switchloading: false
      };
    case SWITCH_PROJECT_REQUEST:
      return { ...state, switchloading: true }
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
        SelectedProject: { ...state.SelectedProject, devices: modDeviceList },
        loading: false
      };
    case SWITCH_DEVICES_REQUEST:
      return { ...state, loading: true }
    default:
      return state;
  }
};
