import React from "react";
import ResetPassword from "../components/authentication/ResetPassword";
import { testStore, findByTestAttr } from "../../Utils";
import { createShallow } from "@material-ui/core/test-utils";

describe("ResetPassword Component", () => {
  describe("Component Renders", () => {
    let shallow;
    let shallowComponent;
    beforeEach(() => {
      const expectedProps = {
        auth: {
          token_verified: true
          }
      };
      const store = testStore(expectedProps);
      shallow = createShallow({ dive: true });
      shallowComponent = shallow(<ResetPassword store={store} />)
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
      const resetPassword = findByTestAttr(shallowComponent, "ResetPasswordComponent");
      expect(resetPassword.length).toBe(1);
    });
    it("Should render the login form", () => {
      const resetPassword = findByTestAttr(shallowComponent, "ResetPasswordForm");
      expect(resetPassword.length).toBe(1);
    });
  });
});
