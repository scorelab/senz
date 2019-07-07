import React from "react";
import Settings from "../components/project/Settings/Settings";
import { testStore } from "../../Utils";
import { createShallow } from "@material-ui/core/test-utils";

describe("AllProject Component", () => {
  describe("Component should render without errors", () => {
    let MaterialShallow;
    beforeEach(() => {
      MaterialShallow = createShallow();
    });
    it("Should render the component", () => {
      const store = testStore({});
      const component = MaterialShallow(<Settings store={store} />);
      expect(component.length).toBe(1);
    });
    it("Should render the form component", () => {
      const store = testStore({});
      const component = MaterialShallow(<Settings store={store} />);
      const form = component.dive().find(`[data-test='FormComponent']`);
      expect(form.length).toBe(1);
    });
  });
});
