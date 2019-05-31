import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR
} from "./types/index";

import axios from "axios";

const URL = "http://localhost:8080/api";

export const RegisterAction = ({ name, email, password }, history) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${URL}/register`, {
        name: name,
        email: email,
        password: password
      });
      dispatch({ type: AUTHENTICATED });
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
      dispatch({ type: AUTHENTICATED });
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
  return {
    type: UNAUTHENTICATED
  };
};
