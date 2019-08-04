import React from "react";
import ProjectList from "../components/project/ProjectList";
import { createShallow } from "@material-ui/core/test-utils";
import { testStore } from "../../Utils";

describe("ProjectList Component", () => {
  describe("Should render the component", () => {
    let shallow;
    beforeEach(() => {
      shallow = createShallow();
    });
    it("Should render the component", () => {
      const store = testStore({});
      const component = shallow(<ProjectList store={store} />);
      expect(component.length).toBe(1);
    });
  });
});
