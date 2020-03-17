import {
  ADD_DEVICE,
  EDIT_DEVICE,
  FETCH_DEVICES,
  SWITCH_DEVICE,
  REMOVE_DEVICES,
  TOGGLE_IS_EDITING_DEVICE
} from "./types/index";

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

//Edit device action
export const editDeviceAction = (name, pubkey, deviceId, token, userId) => {
  return async dispatch => {
    const response = await axios.put(
      `${URL}/${userId}/edit`,
      {
        name,
        pubkey,
        deviceId
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
    dispatch({ type: EDIT_DEVICE, payload: response.data });
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

//Remove devices from all device menu.
export const removeDevices = (userId, devices, token) => {
  return async dispatch => {
    const response = await axios.delete(`${URL}/${userId}/delete`, {
      headers: {
        Authorization: token
      },
      data: devices
    });
    console.log(response.data);
    dispatch({ type: REMOVE_DEVICES, payload: devices });
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

export const toggleIsEditingDevice = toggleValue => {
  return { type: TOGGLE_IS_EDITING_DEVICE, payload: toggleValue };
};
