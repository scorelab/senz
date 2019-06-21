import React from "react";
import AddDevice from "./AddDevice";
import { testStore, findByTestAttr } from "../../../Utils";
import { createShallow } from "@material-ui/core/test-utils";

describe("AddDevice Component", () => {
  describe("Component renders", () => {
    it("Should render the component correctly", () => {
      const shallow = createShallow({ dive: true });
      const initialState = {
        auth: {
          user: {
            name: "TestName"
          }
        },
        device: {
          AllDevices: [{ name: "testname", date: "testdate" }]
        }
      };
      const store = testStore(initialState);
      const shallowComponent = shallow(<AddDevice store={store} />)
        .dive()
        .dive()
        .dive()
        .dive()
        .dive()
        .dive()
        .dive()
        .dive()
        .dive()
        .dive()
        .dive();
      const addDevice = findByTestAttr(shallowComponent, "AddDeviceComponent");
      expect(addDevice.length).toBe(1);
    });
  });
});
