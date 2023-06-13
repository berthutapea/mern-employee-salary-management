import axios from 'axios';
import Cookies from 'js-cookie';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_USER,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE
} from './authActionTypes';

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

export const changePasswordSuccess = (message) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: message
  };
};

export const changePasswordFailure = (error) => {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    payload: error
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      const user = response.data;
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailure(error.response.data.msg));
    }
  };
};

export const fetchUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/login');
      const user = response.data;
      dispatch(setUser(user));
    } catch (error) {
      dispatch(loginFailure(error.response.data.msg));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      await axios.delete('http://localhost:5000/logout');
      dispatch(logout());
      Cookies.remove('token');
    } catch (error) {
      console.log('Error occurred while logging out:', error);
    }
  };
};

export const changeUserPassword = (password, confPassword) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/change_password', { password, confPassword });
      const message = response.data.msg;
      dispatch(changePasswordSuccess(message));
    } catch (error) {
      dispatch(changePasswordFailure(error.response.data.msg));
    }
  };
};