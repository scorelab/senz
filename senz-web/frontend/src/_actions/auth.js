import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  UPDATE_USER,
  CLEAR_ALL
} from "./types/index";

import axios from "axios";
import decode from "jwt-decode";

const URL = "http://localhost:8080/api";

export const RegisterAction = ({ name, email, password }, history) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${URL}/register`, {
        name: name,
        email: email,
        password: password
      });
      const user = {
        ...decode(response.data.token),
        token: response.data.token
      };
      dispatch({ type: AUTHENTICATED, payload: user });
      localStorage.setItem("id_token", response.data.token);
      history.push("/home");
    } catch (err) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: "Invalid"
      });
    }
  };
};

export const LoginAction = ({ email, password }, history) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${URL}/login`, {
        email: email,
        password: password
      });
      const user = {
        ...decode(response.data.token),
        token: response.data.token
      };
      dispatch({ type: AUTHENTICATED, payload: user });
      localStorage.setItem("id_token", response.data.token);
      history.push("/home");
    } catch (err) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: "Invalid"
      });
    }
  };
};

export const LogoutAction = history => {
  localStorage.removeItem("id_token");
  history.push("/register");
  return async dispatch => {
    dispatch({ type: UNAUTHENTICATED });
    dispatch({ type: CLEAR_ALL });
  };
};

export const updateUserData = (
  userId,
  token,
  name,
  oldPassword,
  newPassword
) => {
  return async dispatch => {
    const response = await axios.put(
      `${URL}/${userId}/update`,
      {
        name,
        oldPassword,
        newPassword
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
    dispatch({ type: UPDATE_USER, payload: response.data });
  };
};
