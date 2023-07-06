import axios from 'axios';
import {
    GET_DATA_GAJI_SUCCESS,
    GET_DATA_GAJI_FAILURE,
    DELETE_DATA_GAJI_SUCCESS,
    DELETE_DATA_GAJI_FAILURE
} from './dataGajiActionTypes';

const API_URL = 'http://localhost:5000';

export const getDataGaji = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/data_gaji_pegawai`);
            dispatch({
                type: GET_DATA_GAJI_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_DATA_GAJI_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteDataGaji = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/data_gaji_pegawai/id/${id}`);
            dispatch({
                type: DELETE_DATA_GAJI_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_DATA_GAJI_FAILURE,
                payload: error.message
            });
        }
    };
};
