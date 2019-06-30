import React from "react";
import ProjectTab from "./ProjectTab";
import { createShallow } from "@material-ui/core/test-utils";
import { testStore, findByTestAttr } from "../../../Utils";

describe("ProjectTab Component", () => {
  describe("Component renders ", () => {
    let shallow;
    let shallowComponent;
    beforeEach(() => {
      shallow = createShallow({ dive: true });
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
      shallowComponent = shallow(<ProjectTab store={store} />).dive();
    });
    it("Should render without errors", () => {
      const component = findByTestAttr(shallowComponent, "ProjectTabComponent");
      expect(component.length).toBe(1);
    });
    it("Should render the tab component", () => {
      const tab = findByTestAttr(shallowComponent, "TabsComponent");
      expect(tab.length).toBe(1);
    });
  });
});
