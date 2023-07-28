import axios from 'axios';
import {
    GET_DATA_PEGAWAI_SUCCESS,
    GET_DATA_PEGAWAI_FAILURE,
    PEGAWAI_IMAGE_SUCCESS,
    PEGAWAI_IMAGE_FAILURE,
    GET_DATA_PEGAWAI_BY_ID_SUCCESS,
    GET_DATA_PEGAWAI_BY_ID_FAILURE,
    GET_DATA_PEGAWAI_BY_NIK_SUCCESS,
    GET_DATA_PEGAWAI_BY_NIK_FAILURE,
    GET_DATA_PEGAWAI_BY_NAME_SUCCESS,
    GET_DATA_PEGAWAI_BY_NAME_FAILURE,
    CREATE_DATA_PEGAWAI_REQUEST,
    CREATE_DATA_PEGAWAI_SUCCESS,
    CREATE_DATA_PEGAWAI_FAILURE,
    UPDATE_DATA_PEGAWAI_SUCCESS,
    UPDATE_DATA_PEGAWAI_FAILURE,
    DELETE_DATA_PEGAWAI_SUCCESS,
    DELETE_DATA_PEGAWAI_FAILURE
} from './dataPegawaiActionTypes';

const API_URL = 'http://localhost:5000';

export const getDataPegawai = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/data_pegawai`);
            dispatch({
                type: GET_DATA_PEGAWAI_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_DATA_PEGAWAI_FAILURE,
                payload: error.message
            });
        }
    };
};

export const pegawaiImage = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/images`);
            dispatch({
                type: PEGAWAI_IMAGE_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: PEGAWAI_IMAGE_FAILURE,
                payload: error.message
            });
        }
    };
};

export const getDataPegawaiById = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/data_pegawai/id/${id}`);
            dispatch({
                type: GET_DATA_PEGAWAI_BY_ID_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_DATA_PEGAWAI_BY_ID_FAILURE,
                payload: error.message
            });
        }
    };
};

export const getDataPegawaiByNik = (nik) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/data_pegawai/nik/${nik}`);
            dispatch({
                type: GET_DATA_PEGAWAI_BY_NIK_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_DATA_PEGAWAI_BY_NIK_FAILURE,
                payload: error.message
            });
        }
    };
};

export const getDataPegawaiByName = (nama_pegawai) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/data_pegawai/name/${nama_pegawai}`);
            dispatch({
                type: GET_DATA_PEGAWAI_BY_NAME_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_DATA_PEGAWAI_BY_NAME_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createDataPegawai = (formData, navigate) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_DATA_PEGAWAI_REQUEST });

        try {
            const response = await axios.post(`${API_URL}/data_pegawai`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            dispatch({
                type: CREATE_DATA_PEGAWAI_SUCCESS,
                payload: response.data
            });
            navigate("/data-pegawai");
            return response.data;
        } catch (error) {
            dispatch({
                type: CREATE_DATA_PEGAWAI_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};

export const updateDataPegawai = (id, data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}/data_pegawai/${id}`, data);
            dispatch({
                type: UPDATE_DATA_PEGAWAI_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_DATA_PEGAWAI_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteDataPegawai = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/data_pegawai/${id}`);
            dispatch({
                type: DELETE_DATA_PEGAWAI_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_DATA_PEGAWAI_FAILURE,
                payload: error.message
            });
        }
    };
};
