import { ADD_DEVICE, FETCH_DEVICES } from "./types/index";
import axios from "axios";

const URL = "http://localhost:8080/device";

export const addDeviceAction = (name, pubkey, token, userId) => {
  return async dispatch => {
    const response = await axios.post(
      `${URL}/${userId}/new`,
      {
        name,
        pubkey
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
    dispatch({ type: ADD_DEVICE, payload: response.data });
  };
};

//All devices action
export const fetchAllDeviceAction = (userId, token) => {
  return async dispatch => {
    const response = await axios.get(`${URL}/${userId}/all`, {
      headers: {
        Authorization: token
      }
    });
    dispatch({ type: FETCH_DEVICES, payload: response.data });
  };
};
