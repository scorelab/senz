import React from "react";
import AllProject from "./AllProjects";
import { checkProps, testStore } from "../../../Utils";
import { createShallow } from "@material-ui/core/test-utils";

describe("AllProject Component", () => {
  describe("Checking proptypes", () => {
    it("Should not throw a warning ", () => {
      const expectedProps = {
        projects: [
          { name: "Test Name", description: "Test Description", status: true },
          { name: "Test Name", description: "Test Description", status: true }
        ],
        toggleHeadingAction: jest.fn(),
        fetchProjectAction: jest.fn(),
        user: { name: "Test name", token: "Test token", _id: "test id" }
      };
      const propsError = checkProps(AllProject, expectedProps);
      expect(propsError).toBeUndefined();
    });
  });
  describe("Component should render without errors", () => {
    let MaterialShallow;
    beforeEach(() => {
      MaterialShallow = createShallow();
    });
    it("Should render the component", () => {
      const store = testStore({});
      const component = MaterialShallow(<AllProject store={store} />);
      expect(component.length).toBe(1);
    });
  });
});
