import {
  FETCH_PROJECTS,
  ADD_PROJECT,
  SET_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT_INFO,
  ADD_DEVICE_PROJECT
  DELETE_PROJECT
} from "../_actions/types/index";
import axios from "axios";

const URL = "http://localhost:8080/project";
export const fetchProjectAction = (userId, token) => {
  return async dispatch => {
    const response = await axios.get(`${URL}/${userId}/all`, {
      headers: {
        Authorization: token
      }
    });
    dispatch({ type: FETCH_PROJECTS, payload: response.data });
  };
};

export const addProjectAction = ({ name, description }, userId, token) => {
  return async dispatch => {
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
  };
};

export const setProjectAction = (projectId, token) => {
  return async dispatch => {
    const response = await axios.get(`${URL}/${projectId}/info`, {
      headers: {
        Authorization: token
      }
    });
    dispatch({ type: SET_PROJECT, payload: response.data });
  };
};

export const deleteProjectAction = (projectId, userId, token) => {
  return async dispatch => {
    await axios.delete(`${URL}/${userId}/delete/${projectId}`, {
      headers: {
        Authorization: token
      }
    });
    dispatch({ type: DELETE_PROJECT, payload: projectId });
  };
};

export const updateProjectInfoAction = (
  projectId,
  token,
  name,
  description
) => {
  return async dispatch => {
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
};

export const addDeviceToProjectAction = (projectId, token, pubkey) => {
  return async dispatch => {
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
};
