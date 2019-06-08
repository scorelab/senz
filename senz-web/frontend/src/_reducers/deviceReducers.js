import { ADD_DEVICE, FETCH_DEVICES, CLEAR_ALL } from "../_actions/types";

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
    default:
      return state;
  }
};
