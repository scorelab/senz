import {
  FETCH_PROJECTS,
  ADD_PROJECT,
  ADD_PROJECT_ERROR,
  SET_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT_INFO,
  ADD_DEVICE_PROJECT,
  HANDLE_SWITCH,
  REMOVE_DEVICE_PROJECT,
  REMOVE_PROJECT_DEVICE,
  FETCH_PROJECT_REQUEST,
  SWITCH_PROJECT_REQUEST,
  REMOVE_DEVICE_FROM_PROJECT_REQUEST,
  ADD_PROJECT_REQUEST,
  DELETE_PROJECT_REQUEST,
  UPDATE_PROJECT_REQUEST,
  SET_PROJECT_REQUEST,
  ADD_DEVICE_TO_PROJECT_REQUEST
} from "../_actions/types/index";
import axios from "axios";

const URL = "http://localhost:8080/project";
export const fetchProjectAction = (userId, token) => {
  return async dispatch => {
    dispatch(request())
    const response = await axios.get(`${URL}/${userId}/all`, {
      headers: {
        Authorization: token
      }
    });
    dispatch({ type: FETCH_PROJECTS, payload: response.data });
  };
  function request() {
    return { type: FETCH_PROJECT_REQUEST }
  }
};

export const addProjectAction = ({ name, description }, userId, token) => {
  return async dispatch => {
    dispatch(request())
    try {
      const response = await axios.post(
        `${URL}/${userId}/new`,
        {
          name: name,
          description: description
        },
        {
          headers: {
            Authorization: token
          }
        }
      );
      dispatch({ type: ADD_PROJECT, payload: response.data });
    }
    catch(err) {
      dispatch({
        type: ADD_PROJECT_ERROR,
        payload: "Invalid"
      });
    }
  }
  function request() {
    return { type: ADD_PROJECT_REQUEST }
  }
};

export const setProjectAction = (projectId, token) => {
  return async dispatch => {
    dispatch(request())
    const response = await axios.get(`${URL}/${projectId}/info`, {
      headers: {
        Authorization: token
      }
    });
    dispatch({ type: SET_PROJECT, payload: response.data });
  };
  function request() {
    return { type: SET_PROJECT_REQUEST }
  }
};

export const deleteProjectAction = (projectId, userId, token) => {
  return async dispatch => {
    dispatch(request())
    const response = await axios.delete(
      `${URL}/${userId}/delete/${projectId}`,
      {
        headers: {
          Authorization: token
        }
      }
    );
    dispatch({ type: DELETE_PROJECT, payload: response.data });
  };
  function request() {
    return { type: DELETE_PROJECT_REQUEST }
  }
};

export const updateProjectInfoAction = (
  projectId,
  token,
  name,
  description
) => {
  return async dispatch => {
    dispatch(request())
    const response = await axios.put(
      `${URL}/${projectId}/info`,
      {
        name,
        description
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
    dispatch({ type: UPDATE_PROJECT_INFO, payload: response.data });
  };
  function request() {
    return { type: UPDATE_PROJECT_REQUEST }
  }
};

export const addDeviceToProjectAction = (projectId, token, pubkey) => {
  return async dispatch => {
    dispatch(request())
    const response = await axios.post(
      `${URL}/${projectId}/deviceAdd`,
      {
        pubkey
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
    dispatch({ type: ADD_DEVICE_PROJECT, payload: response.data });
  };
  function request() {
    return { type: ADD_DEVICE_TO_PROJECT_REQUEST }
  }
};

//Remove devices from a project
export const removeProjectDevices = (projectId, devices, token) => {
  const dataObj = { devices, projectId };
  return async dispatch => {
    dispatch(request())
    const response = await axios.put(
      `${URL}/${projectId}/delDevice`,
      {
        devices
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
    dispatch({ type: REMOVE_DEVICE_PROJECT, payload: response.data });
    dispatch({ type: REMOVE_PROJECT_DEVICE, payload: dataObj });
  };
  function request() {
    return { type: REMOVE_DEVICE_FROM_PROJECT_REQUEST }
  }
};

//Update the status of the project
export const switchProjectStatus = (projectId, status, token) => {
  return async dispatch => {
    dispatch(request())
    const response = await axios.put(
      `${URL}/${projectId}/status`,
      {
        status
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
    dispatch({ type: HANDLE_SWITCH, payload: response.data });
  };
  function request() {
    return { type: SWITCH_PROJECT_REQUEST }
  }
};
