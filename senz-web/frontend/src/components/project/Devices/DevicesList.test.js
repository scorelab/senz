import React from "react";
import { testStore } from "../../../../Utils";
import DeviceList from "./DevicesList";
import { createShallow } from "@material-ui/core/test-utils";

describe("Device List Component", () => {
  describe("Renders without errors", () => {
    let shallow;
    beforeEach(() => {
      shallow = createShallow();
    });
    const expectedProps = {
      project: [
        {
          name: "Test Project",
          description: "Test Description",
          status: true,
          devices: [{ name: "Test device", status: true }]
        }
      ]
    };
    it("Should render without errors", () => {
      const store = testStore({});
      const component = shallow(
        <DeviceList store={store} {...expectedProps} />
      );
      expect(component.length).toBe(1);
    });
  });
});
