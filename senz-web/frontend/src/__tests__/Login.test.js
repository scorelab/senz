import React from "react";
import Login from "../components/authentication/Login";
import { testStore, findByTestAttr } from "../../Utils";
import { createShallow } from "@material-ui/core/test-utils";

describe("Login Component", () => {
  describe("Component Renders", () => {
    let shallow;
    let shallowComponent;
    beforeEach(() => {
      shallow = createShallow({ dive: true });
      const store = testStore({});
      shallowComponent = shallow(<Login store={store} />)
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
      const login = findByTestAttr(shallowComponent, "LoginComponent");
      expect(login.length).toBe(1);
    });
    it("Should render the login form", () => {
      const login = findByTestAttr(shallowComponent, "LoginForm");
      expect(login.length).toBe(1);
    });
  });
});
