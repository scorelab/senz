import React from "react";
import AddProject from "./AddProject";
import { testStore } from "../../../Utils";
import { createShallow } from "@material-ui/core/test-utils";

describe("AllProject Component", () => {
  describe("Component should render without errors", () => {
    let MaterialShallow;
    beforeEach(() => {
      MaterialShallow = createShallow();
    });
    it("Should render the component", () => {
      const store = testStore({});
      const component = MaterialShallow(<AddProject store={store} />);
      expect(component.length).toBe(1);
    });
    //TODO:Write method test
  });
});
