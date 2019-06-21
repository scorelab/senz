import {
  FETCH_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT_INFO
} from "../_actions/types";
import { projectReducers } from "./projectReducers";

describe("Project Reducer", () => {
  it("Should return the default state", () => {
    const newState = projectReducers(undefined, {});
    const expectedState = { AllProject: [], SelectedProject: {} };
    expect(newState).toEqual(expectedState);
  });
  it("Should fetch all project", () => {
    const mockPayload = [{ name: "Test1" }, { name: "Test2" }];
    const newState = projectReducers(undefined, {
      type: FETCH_PROJECTS,
      payload: mockPayload
    });
    expect(newState).toEqual({ AllProject: mockPayload, SelectedProject: {} });
  });
  it("Should add a project", () => {
    const mockPayload = { name: "Test1" };
    const AllProject = [{ name: "Test2" }];
    const newState = projectReducers(
      { AllProject, SelectedProject: {} },
      {
        type: ADD_PROJECT,
        payload: mockPayload
      }
    );
    expect(newState).toEqual({
      AllProject: [...AllProject, mockPayload],
      SelectedProject: {}
    });
  });
  it("Should delete a project", () => {
    const mockPayload = { name: "Test1", _id: "1" };
    const AllProject = [{ name: "Test1", _id: "1" }];
    const newState = projectReducers(
      { AllProject, SelectedProject: {} },
      {
        type: DELETE_PROJECT,
        payload: mockPayload
      }
    );
    expect(newState).toEqual({ AllProject: [], SelectedProject: {} });
  });
  it("Should update a project info", () => {
    const mockPayload = { name: "Test1", _id: "1" };
    const AllProject = [{ name: "MockName", _id: "1" }];
    const newState = projectReducers(
      { AllProject, SelectedProject: {} },
      {
        type: UPDATE_PROJECT_INFO,
        payload: mockPayload
      }
    );
    expect(newState).toEqual({
      AllProject: [{ name: "Test1", _id: "1" }],
      SelectedProject: mockPayload
    });
  });
});
