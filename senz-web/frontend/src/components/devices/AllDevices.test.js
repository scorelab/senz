import React from "react";
import AllDevices from "./AllDevices";
import { createShallow } from "@material-ui/core/test-utils";
import { testStore, findByTestAttr } from "../../../Utils";

describe("AllDevices Component", () => {
  describe("Should render the component", () => {
    it("Should render the component", () => {
      const shallow = createShallow({ dive: true });
      const initialState = {
        auth: {
          user: {
            name: "Test"
          }
        }
      };
      const store = testStore(initialState);
      const shallowComponent = shallow(<AllDevices store={store} />)
        .dive()
        .dive();
      const alldevices = findByTestAttr(
        shallowComponent,
        "AllDevicesComponent"
      );
      expect(alldevices.length).toBe(1);
    });
  });
  describe("Update the state correctly", () => {
    //Method Testing
    it("handleCheck method should update devices correctly", () => {
      const shallow = createShallow({ dive: true });
      const initialState = {
        auth: {
          user: {
            name: "Test"
          }
        }
      };
      const store = testStore(initialState);
      const shallowComponent = shallow(<AllDevices store={store} />)
        .dive()
        .dive();
      const classInstance = shallowComponent.instance();
      classInstance.state.devices = ["testid1", "testid2"];
      classInstance.handleCheck("testid1");
      const newState = classInstance.state.devices;
      expect(newState.length).toBe(1);
    });
  });
});
