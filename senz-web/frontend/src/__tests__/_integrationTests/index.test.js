import moxios from "moxios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { RegisterAction, LoginAction } from "../../_actions/auth";
import {
  AUTHENTICATED,
  FETCH_PROJECTS,
  ADD_PROJECT,
  UPDATE_PROJECT_INFO,
  DELETE_PROJECT,
  ADD_DEVICE,
  FETCH_DEVICES,
  SWITCH_DEVICE
} from "../../_actions/types/index";
import decode from "jwt-decode";
import {
  addProjectAction,
  fetchProjectAction,
  deleteProjectAction,
  updateProjectInfoAction
} from "../../_actions/project";
import {
  addDeviceAction,
  fetchAllDeviceAction,
  switchDevice
} from "../../_actions/device";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("ACTION CREATORS", () => {
  describe("AUTH ACTION CREATORS", () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
    it("Should register the user by saving JWT", () => {
      const mockResponse = {
        auth: true,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMGQzMzhkZGQyODg2N2Y3MmQ2MWI2NiIsIm5hbWUiOiJZYXNoIiwiaWF0IjoxNTYxMTQ2MjUzLCJleHAiOjE1NjEyMzI2NTN9.fwpgDTGvFiTOCXVavEJoP9Be72hvw2TBeRI4Gl265VA"
      };
      const store = mockStore({});
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockResponse
        });
      });
      const testUser = {
        name: "test",
        password: "test",
        email: "test@test.com"
      };
      const expectedAction = {
        type: AUTHENTICATED,
        payload: {
          id: "5d0d338ddd28867f72d61b66",
          name: "Yash",
          iat: 1561146253,
          exp: 1561232653,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMGQzMzhkZGQyODg2N2Y3MmQ2MWI2NiIsIm5hbWUiOiJZYXNoIiwiaWF0IjoxNTYxMTQ2MjUzLCJleHAiOjE1NjEyMzI2NTN9.fwpgDTGvFiTOCXVavEJoP9Be72hvw2TBeRI4Gl265VA"
        }
      };
      return store.dispatch(RegisterAction(testUser)).then(() => {
        const actualAction = store.getActions();
        expect(actualAction[0]).toEqual(expectedAction);
      });
    });
    it("Should login the user and save the JWT token", () => {
      const mockResponse = {
        auth: true,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMGQzMzhkZGQyODg2N2Y3MmQ2MWI2NiIsIm5hbWUiOiJZYXNoIiwiaWF0IjoxNTYxMTQ2MjUzLCJleHAiOjE1NjEyMzI2NTN9.fwpgDTGvFiTOCXVavEJoP9Be72hvw2TBeRI4Gl265VA"
      };
      const store = mockStore({});
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockResponse
        });
      });
      const testUser = {
        password: "test",
        email: "test@test.com"
      };
      const expectedAction = {
        type: AUTHENTICATED,
        payload: {
          id: "5d0d338ddd28867f72d61b66",
          name: "Yash",
          iat: 1561146253,
          exp: 1561232653,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMGQzMzhkZGQyODg2N2Y3MmQ2MWI2NiIsIm5hbWUiOiJZYXNoIiwiaWF0IjoxNTYxMTQ2MjUzLCJleHAiOjE1NjEyMzI2NTN9.fwpgDTGvFiTOCXVavEJoP9Be72hvw2TBeRI4Gl265VA"
        }
      };
      return store.dispatch(LoginAction(testUser, [])).then(() => {
        const actualAction = store.getActions();
        expect(actualAction[0]).toEqual(expectedAction);
      });
    });
  });
  describe("PROJECT ACTION CREATORS", () => {
    let user;
    let token;
    beforeEach(() => {
      moxios.install();
      user = decode(localStorage.getItem("id_token"));
      token = localStorage.getItem("id_token");
    });
    afterEach(() => {
      moxios.uninstall();
    });
    it("Should add a project", () => {
      const mockResponse = {
        name: "test",
        description: "test",
        _id: "test",
        devices: []
      };
      const store = mockStore({});
      const testProject = {
        name: "test",
        description: "test"
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockResponse
        });
      });
      const expectedAction = {
        type: ADD_PROJECT,
        payload: mockResponse
      };
      return store.dispatch(addProjectAction(testProject)).then(() => {
        const actualAction = store.getActions();
        expect(actualAction[0]).toEqual(expectedAction);
      });
    });
    it("Should fetch all projects", () => {
      const mockResponse = [
        {
          name: "test",
          description: "test",
          _id: "test",
          devices: []
        }
      ];
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockResponse
        });
      });
      const store = mockStore({});
      const fetchArg = {
        userId: user.id,
        token: token
      };
      const expectedAction = {
        type: FETCH_PROJECTS,
        payload: mockResponse
      };
      return store.dispatch(fetchProjectAction({ ...fetchArg })).then(() => {
        const actualAction = store.getActions();
        expect(actualAction[0]).toEqual(expectedAction);
      });
    });
    it("Should delete the project", () => {
      const mockResponse = {
        name: "test",
        description: "test",
        _id: "test"
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockResponse
        });
      });
      const store = mockStore({});
      const deleteArg = {
        projectId: "test",
        userId: user.id,
        token
      };
      const expectedAction = { type: DELETE_PROJECT, payload: mockResponse };
      return store.dispatch(deleteProjectAction({ ...deleteArg })).then(() => {
        const actualAction = store.getActions();
        expect(actualAction[0]).toEqual(expectedAction);
      });
    });
    it("Should update the project information", () => {
      const mockResponse = {
        name: "test",
        description: "test",
        _id: "test"
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockResponse
        });
      });
      const store = mockStore({});
      const updateArg = {
        projectId: "test",
        token: token,
        name: "test",
        description: "test"
      };
      const expectedAction = {
        type: UPDATE_PROJECT_INFO,
        payload: mockResponse
      };
      return store
        .dispatch(updateProjectInfoAction({ ...updateArg }))
        .then(() => {
          const actualAction = store.getActions();
          expect(actualAction[0]).toEqual(expectedAction);
        });
    });
  });
  describe("DEVICE ACTION CREATORS", () => {
    let user;
    let token;
    beforeEach(() => {
      moxios.install();
      user = decode(localStorage.getItem("id_token"));
      token = localStorage.getItem("id_token");
    });
    afterEach(() => {
      moxios.uninstall();
    });
    it("Should add a new device", () => {
      const mockResponse = {
        name: "test",
        description: "name",
        pubkey: "test",
        _id: "test"
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockResponse
        });
      });
      const store = mockStore({});
      const addArg = {
        name: "test",
        pubkey: "test",
        token,
        userId: user.id
      };
      const expectedAction = { type: ADD_DEVICE, payload: mockResponse };
      return store.dispatch(addDeviceAction({ ...addArg })).then(() => {
        const actualAction = store.getActions();
        expect(actualAction[0]).toEqual(expectedAction);
      });
    });
    it("Should fetch all devices", () => {
      const mockResponse = [
        { name: "test", description: "test", pubkey: "test", _id: "test" }
      ];
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockResponse
        });
      });
      const store = mockStore({});
      const fetchArg = {
        userId: user.id,
        token
      };
      const expectedAction = { type: FETCH_DEVICES, payload: mockResponse };
      return store.dispatch(fetchAllDeviceAction({ ...fetchArg })).then(() => {
        const actualAction = store.getActions();
        expect(actualAction[0]).toEqual(expectedAction);
      });
    });
    it("Should switch the status of array of devices", () => {
      const mockResponse = [
        { name: "test", description: "test", status: false, _id: "test" }
      ];
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockResponse
        });
      });
      const store = mockStore({});
      const switchArg = {
        devices: ["test1", "test2"],
        status: false,
        token
      };
      const expectedAction = { type: SWITCH_DEVICE, payload: mockResponse };
      return store.dispatch(switchDevice({ ...switchArg })).then(() => {
        const actualAction = store.getActions();
        expect(actualAction[0]).toEqual(expectedAction);
      });
    });
  });
});
