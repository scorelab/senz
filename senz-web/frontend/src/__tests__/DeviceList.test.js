import React from "react";
import DeviceList from "../components/devices/DeviceList";
import { createShallow } from "@material-ui/core/test-utils";
import { testStore, findByTestAttr } from "../../Utils";

describe("DeviceList Component", () => {
  describe("Renders Correctly", () => {
    it("Should render the component", () => {
      const initialState = {
        device: {
          AllDevices: [{ name: "test", date: "Test date" }]
        }
      };
      const store = testStore(initialState);
      const shallow = createShallow({ dive: true });
      const shallowComponent = shallow(<DeviceList store={store} />).dive();
      const deviceList = findByTestAttr(
        shallowComponent,
        "DeviceListComponent"
      );
      expect(deviceList.length).toBe(1);
    });
    it("Should NOT render", () => {
      const store = testStore({});
      const shallow = createShallow({ dive: true });
      const shallowComponent = shallow(<DeviceList store={store} />).dive();
      const deviceList = findByTestAttr(
        shallowComponent,
        "DeviceListComponent"
      );
      expect(deviceList.length).toBe(0);
    });
    it("Should render the table component", () => {
      const initialState = {
        device: {
          AllDevices: [{ name: "test", date: "Test date" }]
        }
      };
      const store = testStore(initialState);
      const shallow = createShallow({ dive: true });
      const shallowComponent = shallow(<DeviceList store={store} />).dive();
      const table = findByTestAttr(shallowComponent, "TableComponent");
      expect(table.length).toBe(1);
    });
  });
});
