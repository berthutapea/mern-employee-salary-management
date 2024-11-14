import axios from 'axios';
import {
    GET_DATA_JABATAN_SUCCESS,
    GET_DATA_JABATAN_FAILURE,
    CREATE_DATA_JABATAN_SUCCESS,
    CREATE_DATA_JABATAN_FAILURE,
    UPDATE_DATA_JABATAN_SUCCESS,
    UPDATE_DATA_JABATAN_FAILURE,
    DELETE_DATA_JABATAN_SUCCESS,
    DELETE_DATA_JABATAN_FAILURE
} from './dataJabatanActionTypes';

const API_URL = 'http://localhost:5000';

export const getDataJabatan = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/data_jabatan`);
            dispatch({
                type: GET_DATA_JABATAN_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_DATA_JABATAN_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createDataJabatan = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/data_jabatan`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            dispatch({
                type: CREATE_DATA_JABATAN_SUCCESS,
                payload: response.data
            });
            navigate("/data-jabatan");
            return response.data;
        } catch (error) {
            dispatch({
                type: CREATE_DATA_JABATAN_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};

export const updateDataJabatan = (id, data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}/data_jabatan/${id}`, data);
            dispatch({
                type: UPDATE_DATA_JABATAN_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_DATA_JABATAN_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteDataJabatan = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/data_jabatan/${id}`);
            dispatch({
                type: DELETE_DATA_JABATAN_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_DATA_JABATAN_FAILURE,
                payload: error.message
            });
        }
    };
};
