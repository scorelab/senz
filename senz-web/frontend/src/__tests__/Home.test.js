import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../Utils";
import Home from "../components/Home";

const setUp = () => {
  const wrapper = shallow(<Home />).dive();
  return wrapper;
};

describe("Home Component", () => {
  describe("Renders without errors", () => {
    let shallowComponent;
    beforeEach(() => {
      shallowComponent = setUp();
    });
    it("Should render without errors", () => {
      const component = findByTestAttr(shallowComponent, "HomeComponent");
      expect(component.length).toBe(1);
    });
  });
});
