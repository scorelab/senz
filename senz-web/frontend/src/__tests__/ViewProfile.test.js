import React from "react";
import { testStore } from "../../Utils";
import ViewProfile from "../components/profile/ViewProfile";
import { createShallow } from "@material-ui/core/test-utils";

describe("ViewProfile Component", () => {
  describe("Renders without errors", () => {
    let shallow;
    beforeEach(() => {
      shallow = createShallow();
    });
    it("Should render the component", () => {
      const store = testStore({});
      const component = shallow(<ViewProfile store={store} />);
      expect(component.length).toBe(1);
    });
  });
});
