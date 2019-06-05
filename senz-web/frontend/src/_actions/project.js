import {
  FETCH_PROJECTS,
  ADD_PROJECT,
  SET_PROJECT
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
