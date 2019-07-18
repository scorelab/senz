import { FETCH_STATUS_LOG, FETCH_LOG_PROJECT } from "./types/index";
import axios from "axios";

const URL = "http://localhost:8080/log";

export const fetchStatusBasedLog = (signature, code, token) => {
  return async dispatch => {
    const response = await axios.get(`${URL}/status/${signature}/${code}`, {
      headers: {
        Authorization: token
      }
    });
    const payloadObj = { logArray: response.data, statusCode: code };
    dispatch({ type: FETCH_STATUS_LOG, payload: payloadObj });
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
