import React from "react";
import { shallow } from "enzyme";
import Intro from "../components/project/Intro";
import { findByTestAttr, checkProps } from "../../Utils";

describe("Intro Component", () => {
  describe("Checking proptypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        heading: "Test heading",
        description: "Test description"
      };
      const propsError = checkProps(Intro, expectedProps);
      expect(propsError).toBeUndefined();
    });
  });
  describe("Renders without errors", () => {
    let shallowComponent;
    beforeEach(() => {
      const props = {
        heading: "Test heading",
        description: "Test description"
      };
      shallowComponent = shallow(<Intro {...props} />);
    });
    it("Should render the intro card", () => {
      const notecard = findByTestAttr(shallowComponent, "IntroComponent");
      expect(notecard.length).toBe(1);
    });
  });
});
