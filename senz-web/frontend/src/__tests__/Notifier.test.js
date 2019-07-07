import React from "react";
import { shallow } from "enzyme";
import Notifier from "../components/Notifier";
import { findByTestAttr, checkProps } from "../../Utils";

describe("Notifier Component", () => {
  describe("Checking proptypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        open: true,
        onClose: () => {}
      };
      const propsError = checkProps(Notifier, expectedProps);
      expect(propsError).toBeUndefined();
    });
  });
  describe("Renders without errors", () => {
    let shallowComponent;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        open: true,
        onClose: mockFunc
      };
      shallowComponent = shallow(<Notifier {...props} />);
    });
    it("Should render the notifier", () => {
      const notifier = findByTestAttr(shallowComponent, "NotifierComponent");
      expect(notifier.length).toBe(1);
    });
  });
});
