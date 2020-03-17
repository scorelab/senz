import {
  ADD_DEVICE,
  EDIT_DEVICE,
  FETCH_DEVICES,
  REMOVE_PROJECT_DEVICE,
  REMOVE_DEVICES,
  SWITCH_DEVICE,
  CLEAR_ALL,
  TOGGLE_IS_EDITING_DEVICE,
  ADD_DEVICE_ERROR
} from "../_actions/types";

export const deviceReducers = (
  state = { AllDevices: [], SelectedDevice: {}, isEditingDevice: false },
  action
) => {
  switch (action.type) {
    case ADD_DEVICE:
      return {
        ...state,
        AllDevices: [...state.AllDevices, action.payload],
        SelectedDevice: state.SelectedDevice
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
    case FETCH_DEVICES:
      return {
        ...state,
        AllDevices: action.payload,
        SelectedDevice: state.SelectedDevice
      };
    case CLEAR_ALL:
      return {
        ...state,
        AllDevices: [],
        SelectedDevice: {}
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
        SelectedDevice: state.SelectedDevice
      };
    case REMOVE_DEVICES: {
      const devices = action.payload;
      const modDevices = state.AllDevices.filter(device => {
        return !devices.includes(device._id);
      });
      return {
        ...state,
        AllDevices: modDevices,
        SelectedDevice: {}
      };
    }
    case SWITCH_DEVICE:
      const switchedDevices = state.AllDevices.map(device => {
        for (var i = 0; i < action.payload.length; i++) {
          if (action.payload[i]._id === device._id) {
            device = action.payload[i];
          }
        }
        return device;
      });
      return {
        ...state,
        AllDevices: switchedDevices,
        SelectedDevice: {}
      };
    case TOGGLE_IS_EDITING_DEVICE: {
      const toggleValue = action.payload;
      return { ...state, isEditingDevice: toggleValue };
    }
    default:
      return state;
  }
};
