import {
  ADD_DEVICE,
  FETCH_DEVICES,
  REMOVE_PROJECT_DEVICE,
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
    default:
      return state;
  }
};
