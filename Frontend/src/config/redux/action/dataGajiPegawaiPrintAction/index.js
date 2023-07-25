import axios from "axios";
import {
    GET_DATA_GAJI_SINGLE_PEGAWAI_SUCCESS,
    GET_DATA_GAJI_SINGLE_PEGAWAI_FAILURE,
} from "./dataGajiPegawaiPrintActionTypes";

export const viewDataGajiSinglePegawaiSuccess = (data) => ({
    type: GET_DATA_GAJI_SINGLE_PEGAWAI_SUCCESS,
    payload: data,
});

export const viewDataGajiSinglePegawaiFailure = (error) => ({
    type: GET_DATA_GAJI_SINGLE_PEGAWAI_FAILURE,
    payload: error,
});

export const viewGajiSinglePegawaiByYear = (dataYear) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/data_gaji/month/${dataYear}`
        );
        const data = response.data;
        dispatch(viewDataGajiSinglePegawaiSuccess(data));
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(viewDataGajiSinglePegawaiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};

export const viewGajiSinglePegawaiByMonth = (dataMonth) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/data_gaji/month/${dataMonth}`
        );
        const data = response.data;
        dispatch(viewDataGajiSinglePegawaiSuccess(data));
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(viewDataGajiSinglePegawaiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};

export const viewGajiSinglePegawaiByName = (nama_pegawai) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/data_gaji/name/${nama_pegawai}`
        );
        const data = response.data;
        dispatch(viewDataGajiSinglePegawaiSuccess(data));
    } catch (error) {
        console.log(error);
        if (nama_pegawai) {
            dispatch(viewDataGajiSinglePegawaiFailure("Terjadi kesalahan saat memuat data."));
        }
    }
};
