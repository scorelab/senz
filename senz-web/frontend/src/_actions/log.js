import { FETCH_ALL_LOG, FETCH_LOG_PROJECT } from "./types/index";
import axios from "axios";

const URL = "http://localhost:8080/log";

export const fetchAllLog = (signature, token, devices) => {
  return async dispatch => {
    const response = await axios.post(
      `${URL}/all/${signature}`,
      {
        devices
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
    dispatch({ type: FETCH_ALL_LOG, payload: response.data });
  };
};

export const fetchProjectBasedLog = (signature, devices, token) => {
  return async dispatch => {
    const response = await axios.post(
      `${URL}/project/${signature}`,
      {
        devices
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
    dispatch({ type: FETCH_LOG_PROJECT, payload: response.data });
  };
};
