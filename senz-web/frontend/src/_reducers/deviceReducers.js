import {
  ADD_DEVICE,
  EDIT_DEVICE,
  FETCH_DEVICES,
  REMOVE_PROJECT_DEVICE,
  REMOVE_DEVICES,
  SWITCH_DEVICE,
  CLEAR_ALL,
  TOGGLE_IS_EDITING_DEVICE,
  ADD_DEVICE_ERROR,
  ADD_DEVICE_REQUEST,
  FETCH_DEVICES_REQUEST,
  SWITCH_DEVICES_REQUEST,
  REMOVE_DEVICE_FROM_PROJECT_REQUEST
} from "../_actions/types";

export const deviceReducers = (
  state = { AllDevices: [], SelectedDevice: {}, isEditingDevice: false, loading: false },
  action
) => {
  switch (action.type) {
    case ADD_DEVICE:
      return {
        ...state,
        AllDevices: [...state.AllDevices, action.payload],
        SelectedDevice: state.SelectedDevice,
        loading: false
      };
    case EDIT_DEVICE: {
      return {
        ...state,
        AllDevices: action.payload,
        SelectedDevice: {}
      };
    };
    case ADD_DEVICE_ERROR:
      return { ...state, error: action.payload };
    case ADD_DEVICE_REQUEST:
      return { ...state, loading: true }
    case FETCH_DEVICES:
      return {
        ...state,
        AllDevices: action.payload,
        SelectedDevice: state.SelectedDevice,
        loading: false
      };
    case FETCH_DEVICES_REQUEST:
      return { ...state, loading: true }
    case CLEAR_ALL:
      return {
        ...state,
        AllDevices: [],
        SelectedDevice: {},
        loading: false
      };
    case REMOVE_PROJECT_DEVICE:
      const modifiedDevices = state.AllDevices.map(device => {
        if (action.payload.devices.includes(device._id)) {
          device.projects = device.projects.filter(projectId => {
            return projectId !== action.payload.projectId;
          });
        }
        return device;
      });
      return {
        ...state,
        AllDevices: modifiedDevices,
        SelectedDevice: state.SelectedDevice,
        loading: false
      };
    case REMOVE_DEVICES: {
      const devices = action.payload;
      const modDevices = state.AllDevices.filter(device => {
        return !devices.includes(device._id);
      });
      return {
        ...state,
        AllDevices: modDevices,
        SelectedDevice: {},
      };
    }
    case REMOVE_DEVICE_FROM_PROJECT_REQUEST:
      return { ...state, loading: true }
    case SWITCH_DEVICE:
      const switchedDevice = state.AllDevices.map(device => {
        if (action.payload._id === device._id) {
          device = action.payload;
        }
        return device;
      });
      return {
        ...state,
        AllDevices: switchedDevices,
        SelectedDevice: {},
        loading: false
      };
    case TOGGLE_IS_EDITING_DEVICE: {
      const toggleValue = action.payload;
      return { ...state, isEditingDevice: toggleValue };
    }
    case SWITCH_DEVICES_REQUEST:
      return { ...state, loading: true }
    default:
      return state;
  }
};
