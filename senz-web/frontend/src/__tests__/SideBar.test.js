import React from "react";
import SideBar from "../components/layout/SideBar";
import { createShallow } from "@material-ui/core/test-utils";
import { findByTestAttr } from "../../Utils";

describe("SideBar component", () => {
  describe("Component should render without errors", () => {
    let shallow;
    let shallowComponent;
    beforeEach(() => {
      shallow = createShallow({ dive: true });
      shallowComponent = shallow(<SideBar />);
    });
    it("Should render the component without errors", () => {
      const component = findByTestAttr(shallowComponent, "SideBarComponent");
      expect(component.length).toBe(1);
    });
    it("Should update the state properly", () => {
      const classInstance = shallowComponent.instance();
      classInstance.handlePClick();
      const newState = classInstance.state.popen;
      expect(newState).toBe(true);
    });
  });
});
