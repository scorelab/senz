import React from "react";
import { shallow } from "enzyme";
import ProjectList from "./ProjectList";
import { findByTestAttr, checkProps } from "../../../Utils";

const setUp = props => {
  const wrapper = shallow(<ProjectList {...props} />);
  return wrapper;
};

describe("ProjectList Component", () => {
  describe("Checking proptypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        projects: [
          {
            status: false,
            devices: [],
            _id: "5d04a80d4862cf25817cc2f3",
            name: "hojo",
            description: "hojo",
            date: "2019-06-15T08:10:53.332Z"
          }
        ]
      };
      const propsError = checkProps(ProjectList, expectedProps);
      expect(propsError).toBeUndefined();
    });
  });
  describe("Should render without errors", () => {
    const props = {
      projects: [
        {
          status: false,
          devices: [],
          _id: "5d04a80d4862cf25817cc2f3",
          name: "hojo",
          description: "hojo",
          date: "2019-06-15T08:10:53.332Z"
        }
      ]
    };
    let shallowComponent;
    beforeEach(() => {
      shallowComponent = setUp(props);
    });
    it("Should render the component", () => {
      const component = findByTestAttr(
        shallowComponent,
        "ProjectListComponent"
      );
      expect(component.length).toBe(1);
    });
  });
  describe("Should NOT render the component", () => {
    let shallowComponent;
    beforeEach(() => {
      shallowComponent = setUp();
    });
    it("Should not render the component as projects not given", () => {
      const component = findByTestAttr(
        shallowComponent,
        "ProjectListComponent"
      );
      expect(component.length).toBe(0);
    });
  });
});
