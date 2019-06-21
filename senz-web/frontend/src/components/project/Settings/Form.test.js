import React from "react";
import Form from "./Form";
import { testStore, findByTestAttr } from "../../../../Utils";
import { createShallow } from "@material-ui/core/test-utils";

describe("AllProject Component", () => {
  describe("Components should render without errors", () => {
    let shallow;
    let actualComponent;
    beforeEach(() => {
      const expectedProps = {
        project: {
          SelectedProject: {
            status: true,
            devices: [],
            _id: "5d04a80d4862cf25817cc2f3",
            name: "hojo",
            description: "hojo",
            date: "2019-06-15T08:10:53.332Z",
            __v: 12
          }
        }
      };
      const store = testStore(expectedProps);
      shallow = createShallow({ dive: true });
      actualComponent = shallow(<Form store={store} {...expectedProps} />)
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
    it("Should render the component", () => {
      const store = testStore({});
      const component = shallow(<Form store={store} />);
      expect(component.length).toBe(1);
    });
    it("Should render the Add Devices form", () => {
      const store = testStore({});
      const component = shallow(<Form store={store} />);
      const form = component;
      expect(form.props().form).toBe("addDevice");
    });
    it("Should render the Project detail component", () => {
      const component = findByTestAttr(actualComponent, "ProjectDetailSection");
      expect(component.length).toBe(1);
    });
    it("Should render the project settings section", () => {
      const component = findByTestAttr(
        actualComponent,
        "ProjectSettingsSection"
      );
      expect(component.length).toBe(1);
    });
  });
});
