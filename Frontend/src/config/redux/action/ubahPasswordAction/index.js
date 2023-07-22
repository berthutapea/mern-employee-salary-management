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

        const response = await axios.post(`${API_BASE_URL}/change_password`, {
            headers: {
                "Content-type": "multipart/form-data"
            }
        });

        dispatch(changePasswordSuccess(response.data.msg));
    } catch (error) {
        dispatch(changePasswordFailure(error.message));
    }
};



// import axios from 'axios';
// import {
//     CHANGE_PASSWORD_SUCCESS,
//     CHANGE_PASSWORD_FAILURE,
// } from './ubahPasswordActionTypes';

// const API_URL = 'http://localhost:5000';

// export const changePassword = (id, data) => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.put(`${API_URL}/change_password/${id}`, data);
//             dispatch({
//                 type: CHANGE_PASSWORD_SUCCESS,
//                 payload: response.data
//             });
//         } catch (error) {
//             dispatch({
//                 type: CHANGE_PASSWORD_FAILURE,
//                 payload: error.message
//             });
//         }
//     };
// };