import {
  AUTHENTICATED,
  AUTHENTICATION_REQUEST,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  PASSWORD_RESETTED,
  PASSWORD_RESET_ERROR,
  RESET_PASSWORD_TOKEN_VERIFIED,
  RESET_PASSWORD_TOKEN_VERIFICATION_ERROR,
  PASSWORD_UPDATED,
  PASSWORD_UPDATION_ERROR,
  LOGOUT_REQUEST,
  UPDATE_USER,
  UPDATE_REQUEST,
  CLEAR_ALL
} from "./types/index";

import axios from "axios";
import decode from "jwt-decode";

const URL = "http://localhost:8080/api";

export const RegisterAction = ({ name, email, password }, history) => {
  return async dispatch => {
    dispatch(request())
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
  function request() {
    return { type: AUTHENTICATION_REQUEST }
  }
};

export const LoginAction = ({ email, password }, history) => {
  return async dispatch => {
    dispatch(request())
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
  function request() {
    return { type: AUTHENTICATION_REQUEST }
  }
};

export const LogoutAction = history => {
  localStorage.removeItem("id_token");
  history.push("/register");
  return async dispatch => {
    dispatch(request())
    dispatch({ type: UNAUTHENTICATED });
    dispatch({ type: CLEAR_ALL });
  };
  function request() {
    return { type: LOGOUT_REQUEST }
  }
};

export const ResetPasswordAction = ({email}) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${URL}/reset-password`, {
        email: email
      });
      dispatch({ type: PASSWORD_RESETTED, payload: response.data });
    } catch (err) {
      dispatch({
        type: PASSWORD_RESET_ERROR,
        payload: "Invalid"
      });
    }
  };
};

export const VerifyResetPasswordTokenAction = (user_id, token) => {
  return async dispatch => {
    try {
      const response = await axios.get(`${URL}/reset-password/${user_id}/${token}`);
      const {success} = response.data;
      if(success)
        dispatch({type: RESET_PASSWORD_TOKEN_VERIFIED, 
          payload: response.data});
      else
      dispatch({
        type: RESET_PASSWORD_TOKEN_VERIFICATION_ERROR,
        payload: "Invalid"
      })
    }
    catch(err) {
      dispatch({
        type: RESET_PASSWORD_TOKEN_VERIFICATION_ERROR,
        payload: "Invalid"
      })
    }
  }
}

export const UpdatePasswordAction = ({password, user_id, token}) => {
  return async dispatch => {
    try {
      const response = await axios.put(`${URL}/update-password`, {
        password: password,
        user_id: user_id,
        token: token
      });
      dispatch({ type: PASSWORD_UPDATED, payload: response.data });
    } catch (err) {
      dispatch({
        type: PASSWORD_UPDATION_ERROR,
        payload: "Invalid"
      });
    }
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
    dispatch(request())
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
  function request() {
    return { type: UPDATE_REQUEST }
  }
};
