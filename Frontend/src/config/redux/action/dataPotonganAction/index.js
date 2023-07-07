import axios from 'axios';
import {
    GET_DATA_POTONGAN_SUCCESS,
    GET_DATA_POTONGAN_FAILURE,
    CREATE_DATA_POTONGAN_SUCCESS,
    CREATE_DATA_POTONGAN_FAILURE,
    UPDATE_DATA_POTONGAN_SUCCESS,
    UPDATE_DATA_POTONGAN_FAILURE,
    DELETE_DATA_POTONGAN_SUCCESS,
    DELETE_DATA_POTONGAN_FAILURE
} from './dataPotonganActionTypes';

const API_URL = 'http://localhost:5000';

export const getDataPotongan = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/data_potongan`);
            dispatch({
                type: GET_DATA_POTONGAN_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_DATA_POTONGAN_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createDataPotongan = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/data_potongan`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            dispatch({
                type: CREATE_DATA_POTONGAN_SUCCESS,
                payload: response.data
            });
            navigate("/data-potongan");
            return response.data;
        } catch (error) {
            dispatch({
                type: CREATE_DATA_POTONGAN_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};

export const updateDataPotongan = (id, data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}/data_potongan/${id}`, data);
            dispatch({
                type: UPDATE_DATA_POTONGAN_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_DATA_POTONGAN_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteDataPotongan = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/data_potongan/${id}`);
            dispatch({
                type: DELETE_DATA_POTONGAN_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_DATA_POTONGAN_FAILURE,
                payload: error.message
            });
        }
    };
};
