import { ADD_DEVICE, FETCH_DEVICES } from "../_actions/types";
import { deviceReducers } from "../_reducers/deviceReducers";

describe("Device Reducer", () => {
  it("Should return the default state", () => {
    const newState = deviceReducers(undefined, {});
    expect(newState).toEqual({ AllDevices: [], SelectedDevice: {}, isEditingDevice: false, loading: false  });
  });
  it("Should add a device ", () => {
    const initState = { AllDevices: [{ name: "Test1" }], SelectedDevice: {}, isEditingDevice: false };
    const mockPayload = { name: "Test2" };
    const newState = deviceReducers(initState, {
      type: ADD_DEVICE,
      payload: mockPayload
    });
    expect(newState).toEqual({
      AllDevices: [...initState.AllDevices, mockPayload],
      SelectedDevice: {},
      isEditingDevice: false,
      loading:false
    });
  });
  it("Should fetch all devices", () => {
    const mockPayload = [{ name: "Test1" }, { name: "Test2" }];
    const newState = deviceReducers(undefined, {
      type: FETCH_DEVICES,
      payload: mockPayload
    });
    expect(newState).toEqual({ AllDevices: mockPayload, SelectedDevice: {}, isEditingDevice: false, loading:false });
  });
});
