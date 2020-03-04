import React from "react";
import { testStore } from "../../Utils";
import EditProfile from "../components/profile/EditProfile";
import { createShallow } from "@material-ui/core/test-utils";

describe("EditProfile Component", () => {
  describe("Renders without errors", () => {
    let shallow;
    beforeEach(() => {
      shallow = createShallow();
    });
    it("Should render the component", () => {
      const store = testStore({});
      const component = shallow(<EditProfile store={store} />);
      expect(component.length).toBe(1);
    });
  });
});
