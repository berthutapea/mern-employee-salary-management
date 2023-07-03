import axios from 'axios';
import {
    GET_DATA_KEHADIRAN_SUCCESS,
    GET_DATA_KEHADIRAN_FAILURE,
    CREATE_DATA_KEHADIRAN_SUCCESS,
    CREATE_DATA_KEHADIRAN_FAILURE,
    UPDATE_DATA_KEHADIRAN_SUCCESS,
    UPDATE_DATA_KEHADIRAN_FAILURE,
    DELETE_DATA_KEHADIRAN_SUCCESS,
    DELETE_DATA_KEHADIRAN_FAILURE
} from './dataKehadiranActionTypes';

export const getDataKehadiran = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:5000/data_kehadiran');
            const dataKehadiran = response.data;
            dispatch({
                type: GET_DATA_KEHADIRAN_SUCCESS,
                payload: dataKehadiran
            });
        } catch (error) {
            dispatch({
                type: GET_DATA_KEHADIRAN_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createDataKehadiran = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:5000/data_kehadiran', formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            dispatch({
                type: CREATE_DATA_KEHADIRAN_SUCCESS,
                payload: response.data
            });
            navigate("/data-jabatan");
            return response.data;
        } catch (error) {
            dispatch({
                type: CREATE_DATA_KEHADIRAN_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};

export const updateDataKehadiran = (id, dataKehadiran) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:5000/data_kehadiran/${id}`, dataKehadiran);
            if (response.status === 200) {
                dispatch({
                    type: UPDATE_DATA_KEHADIRAN_SUCCESS,
                    payload: 'Data kehadiran berhasil diupdate'
                });
                dispatch(getDataKehadiran());
            } else {
                dispatch({
                    type: UPDATE_DATA_KEHADIRAN_FAILURE,
                    payload: response.data.message
                });
            }
        } catch (error) {
            dispatch({
                type: UPDATE_DATA_KEHADIRAN_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteDataKehadiran = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:5000/data_kehadiran/${id}`);
            if (response.status === 200) {
                dispatch({
                    type: DELETE_DATA_KEHADIRAN_SUCCESS,
                    payload: 'Delete data berhasil'
                });
                dispatch(getDataKehadiran());
            } else {
                dispatch({
                    type: DELETE_DATA_KEHADIRAN_FAILURE,
                    payload: response.data.message
                });
            }
        } catch (error) {
            dispatch({
                type: DELETE_DATA_KEHADIRAN_FAILURE,
                payload: error.message
            });
        }
    };
};
