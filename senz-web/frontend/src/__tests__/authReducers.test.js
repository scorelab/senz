import { AUTHENTICATED, UNAUTHENTICATED } from "../_actions/types/index";
import authReducers from "../_reducers/authReducers";
describe("Authentication Reducers", () => {
  it("Should return the default state", () => {
    const newState = authReducers(undefined, {});
    expect(newState).toEqual({});
  });
  it("Should authenticate the user", () => {
    const mockPayload = { name: "Test" };
    const newState = authReducers(undefined, {
      type: AUTHENTICATED,
      payload: mockPayload
    });
    expect(newState).toEqual({ authenticated: true, user: mockPayload });
  });
  it("Should unauthenticate the user", () => {
    const newState = authReducers(undefined, {
      type: UNAUTHENTICATED
    });
    expect(newState).toEqual({ user: {}, authenticated: false });
  });
});
