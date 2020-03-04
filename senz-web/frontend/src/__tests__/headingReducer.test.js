import { NAV_HEADING, CLEAR_ALL } from "../_actions/types";
import headingReducer from "../_reducers/headingReducer";

describe("Heading reducer", () => {
  it("Should return the default state", () => {
    const newState = headingReducer(undefined, {});
    expect(newState.heading).toBe("Dashboard");
  });
  it("Should return new heading if receiving type", () => {
    const mockPayload = { heading: "Test" };
    const newState = headingReducer(undefined, {
      type: NAV_HEADING,
      payload: mockPayload
    });
    expect(newState).toEqual(mockPayload);
  });
  it("Should clear all the states", () => {
    const newState = headingReducer(undefined, {
      type: CLEAR_ALL
    });
    expect(newState).toEqual({ heading: "" });
  });
});
