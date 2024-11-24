import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const changePasswordRequest = () => ({
  type: 'CHANGE_PASSWORD_REQUEST',
});

export const changePasswordSuccess = (message) => ({
  type: 'CHANGE_PASSWORD_SUCCESS',
  payload: message,
});

export const changePasswordFailure = (error) => ({
  type: 'CHANGE_PASSWORD_FAILURE',
  payload: error,
});

export const changePassword = (password, confPassword) => async (dispatch) => {
  try {
    dispatch(changePasswordRequest());

    if (password !== confPassword) {
      dispatch(changePasswordFailure('Password dan Konfirmasi Password Tidak Cocok'));
      return;
    }

    const response = await axios.patch(`${API_BASE_URL}/change_password`, {
      password,
      confPassword,
    }, {
      headers: {
        "Content-type": "application/json",
      },
    });

    dispatch(changePasswordSuccess(response.data.msg));
  } catch (error) {
    dispatch(changePasswordFailure(error.message));
  }
};
