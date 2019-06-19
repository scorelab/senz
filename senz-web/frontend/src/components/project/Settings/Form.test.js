import React from "react";
import Form from "./Form";
import { testStore } from "../../../../Utils";
import { createShallow } from "@material-ui/core/test-utils";

describe("AllProject Component", () => {
  describe("Components should render without errors", () => {
    let MaterialShallow;
    beforeEach(() => {
      MaterialShallow = createShallow();
    });
    it("Should render the component", () => {
      const store = testStore({});
      const component = MaterialShallow(<Form store={store} />);
      expect(component.length).toBe(1);
    });
    it("Should render the Add Devices form", () => {
      const store = testStore({});
      const component = MaterialShallow(<Form store={store} />);
      const form = component.dive();
      expect(form.props().form).toBe("addDevice");
    });
  });
});
