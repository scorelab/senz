import React from "react";
import NavBar from "./NavBar";
import { testStore, findByTestAttr } from "../../../Utils";
import { createShallow } from "@material-ui/core/test-utils";

describe("NavBar component", () => {
  describe("Render the component", () => {
    let shallow;
    let shallowComponent;
    beforeEach(() => {
      shallow = createShallow({ dive: true });
      const initialState = {
        heading: {
          heading: "Test"
        }
      };
      const store = testStore(initialState);
      shallowComponent = shallow(<NavBar store={store} />)
        .dive()
        .dive();
    });
    it("Should render the component correctly", () => {
      const navbar = findByTestAttr(shallowComponent, "NavBarComponent");
      expect(navbar.length).toBe(1);
    });
    it("Should render the appbar component correctly", () => {
      const appbar = findByTestAttr(shallowComponent, "AppBarComponent");
      expect(appbar.length).toBe(1);
    });
  });
});
