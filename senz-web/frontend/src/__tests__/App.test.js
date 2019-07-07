import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../Utils";
import App from "../components/App";

const setUp = () => {
  const wrapper = shallow(<App />);
  return wrapper;
};

describe("App Component", () => {
  let shallowComponent;
  beforeEach(() => {
    shallowComponent = setUp();
  });
  it("Should render without errors", () => {
    const component = findByTestAttr(shallowComponent, "AppComponent");
    expect(component.length).toBe(1);
  });
});
