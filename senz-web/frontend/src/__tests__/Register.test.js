import React from "react";
import Register from "../components/authentication/Register";
import { testStore, findByTestAttr } from "../../Utils";
import { createShallow } from "@material-ui/core/test-utils";

describe("Register Component", () => {
  describe("Component Renders", () => {
    let shallow;
    let shallowComponent;
    beforeEach(() => {
      shallow = createShallow({ dive: true });
      const store = testStore({});
      shallowComponent = shallow(<Register store={store} />)
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
    });
    it("Should render the component correctly", () => {
      const register = findByTestAttr(shallowComponent, "RegisterComponent");
      expect(register.length).toBe(1);
    });
    it("Should render the registration form", () => {
      const register = findByTestAttr(shallowComponent, "RegisterForm");
      expect(register.length).toBe(1);
    });
  });
});
