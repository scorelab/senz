import {
  ADD_DEVICE,
  FETCH_DEVICES,
  REMOVE_PROJECT_DEVICE,
  REMOVE_DEVICES,
  SWITCH_DEVICE,
  CLEAR_ALL
} from "../_actions/types";

export const deviceReducers = (
  state = { AllDevices: [], SelectedDevice: {} },
  action
) => {
  switch (action.type) {
    case ADD_DEVICE:
      return {
        AllDevices: [...state.AllDevices, action.payload],
        SelectedDevice: state.SelectedDevice
      };
    case FETCH_DEVICES:
      return {
        AllDevices: action.payload,
        SelectedDevice: state.SelectedDevice
      };
    case CLEAR_ALL:
      return {
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
        AllDevices: modifiedDevices,
        SelectedDevice: state.SelectedDevice
      };
    case REMOVE_DEVICES: {
      const devices = action.payload;
      const modDevices = state.AllDevices.filter(device => {
        return !devices.includes(device._id);
      });
      return {
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
        AllDevices: switchedDevices,
        SelectedDevice: {}
      };
    default:
      return state;
  }
};
