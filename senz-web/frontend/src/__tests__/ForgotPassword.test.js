import React from "react";
import ForgotPassword from "../components/authentication/ForgotPassword";
import { testStore, findByTestAttr } from "../../Utils";
import { createShallow } from "@material-ui/core/test-utils";

describe("ForgotPassword Component", () => {
  describe("Component Renders", () => {
    let shallow;
    let shallowComponent;
    beforeEach(() => {
      shallow = createShallow({ dive: true });
      const store = testStore({});
      shallowComponent = shallow(<ForgotPassword store={store} />)
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
      const forgotPassword = findByTestAttr(shallowComponent, "ForgotPasswordComponent");
      expect(forgotPassword.length).toBe(1);
    });
    it("Should render the login form", () => {
      const forgotPassword = findByTestAttr(shallowComponent, "ForgotPasswordForm");
      expect(forgotPassword.length).toBe(1);
    });
  });
});
