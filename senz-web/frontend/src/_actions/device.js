import { ADD_DEVICE, ADD_DEVICE_ERROR, FETCH_DEVICES, SWITCH_DEVICE } from "./types/index";
import axios from "axios";

const URL = "http://localhost:8080/device";

export const addDeviceAction = (name, pubkey, token, userId) => {
  return async dispatch => {
    try {
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
    }
    catch(err) {
      dispatch({
        type: ADD_DEVICE_ERROR,
        payload: "Invalid"
      });
    }
  }
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
//Switch device
export const switchDevice = (devices, status, token) => {
  return async dispatch => {
    const response = await axios.put(
      `${URL}/switch`,
      {
        devices,
        status
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
    dispatch({ type: SWITCH_DEVICE, payload: response.data });
  };
};
